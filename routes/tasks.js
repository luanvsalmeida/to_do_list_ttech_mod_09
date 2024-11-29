var express = require('express');
var jwt = require('jsonwebtoken');
const { token } = require('morgan');
var Task = require("../model/Tasks")
var TaskValidator = require("../validators/TaskValidator")
var router = express.Router();

router.post('/login', function(req, res) {
  const {user, password} = req.body
  if (user === password) {
    //Realizar o login - Gerar o token
    let token = jwt.sign({user: user}, '#Abcasdfqwr', {
      expiresIn: '20 min'
    })
    res.json({status:true, token: token})
  } else {
    res.status(403).json({status: false, msg: 'Usuario/Senha invalidos'})
  }
})

router.get('/', function(req, res, next) {
  if (Task.list().length == 0) {
    Task.new("Tarefa 1")
    Task.new("Tarefa 2")
  }

  res.json({status: true, list: Task.list()})
});

router.get("/:id", TaskValidator.validateId, function(req, res) {
    let obj = Task.getElementById(req.params.id);
    if (!obj) {
        return res.json({status:false, msg:"Tarefa não encontrada"})
    }

    return res.json({status:true, task:obj})
})

function validateToken(req, res, next) {
  let token_full = req.headers['authorization']
  if (!token_full)
    token_full = ''
  let token = token_full.split(': ')[1]

  jwt.verify(token, '#Abcasdfqwr', (err, payload) => {
    if (err) {
      res.status(403).json({status: false, msg: "Acesso negado - Token invalido"})
      return
    }
    req.user = payload.user
    next()
  })
}

router.post("/",  validateToken, TaskValidator.validateNome, function (req, res){
    res.json({status: true, task:Task.new(req.body.nome)});
})

router.put("/:id", validateToken, TaskValidator.validateId, TaskValidator.validateNome, function(req, res){ 
  let obj = Task.update(req.params.id, req.body.nome);
  if (!obj) {
    return res.json({status: false, msg: "Falha ao alterar a tarefa"})
  }
  
  res.json({status: true, task:obj});
})

router.delete("/:id", validateToken, TaskValidator.validateId, function(req, res){
  if (!Task.delete(req.params.id)) {
    return res.json({status: false, msg: "Falha ao excluir a tarefa"});
  }
  
  res.json({status:true})
})

module.exports = router;
