import taskService from "./taskservice.js"

function estaLogado() {
    let token = localStorage.getItem("token")
    if (token) return true
    else return false
}

function getToken() {
    return localStorage.getItem("token")
}

let atualizaTarefas = async function() {
    let resp = await taskService.lista()
    if (resp.status) {
        let ul =  document.querySelector("#tarefas");
        ul.innerHTML = "";
        resp.list.forEach((item) => {
            let li = document.createElement("li")
            li.appendChild(document.createTextNode(item.name + " "))

            if (estaLogado()) {
                let edit = document.createElement("button")
                edit.addEventListener("click", function() {
                    document.querySelector("#tid").value = item.id
                    document.querySelector("#tnome").value = item.name
                })
                edit.className = "btn btn-link"
                edit.innerHTML = "edit"
                            
                let del = document.createElement("button")
                del.innerHTML = "done"
                del.className = "btn btn-link"
                del.addEventListener("click", async function() {
                    if (confirm("Deseja finalizar a tarefa?")) {
                        let resp = await taskService.exclui(getToken(), item.id)
                        if (resp.status) {
                            ul.removeChild(li);
                        }
                    }
                })

                li.appendChild(edit)
                li.appendChild(del)
            }
            ul.appendChild(li)
        })
    }
}

function atualizaForms() {
    if (estaLogado()) {
        document.querySelector("form#ftarefa").className = '';
        document.querySelector("form#flogin").className = 'oculto';
    } else {
        document.querySelector("form#ftarefa").className = 'oculto';
        document.querySelector("form#flogin").className = '';
    }
    document.querySelector("#tid").value = ''
    document.querySelector("#tnome").value = ''
    document.querySelector("#iusuario").value = '';
    document.querySelector("#isenha").value = '';
    document.querySelector("#msgerro").innerHTML = '';
}

window.addEventListener("load", function() {
    atualizaTarefas()

    document.querySelector("form#ftarefa").addEventListener("submit", async function(evt) {
        evt.preventDefault();
        let hid = document.querySelector("#tid")
        let hnome = document.querySelector("#tnome")
        let resp;
        if (hid.value) {
            resp = await taskService.altera(getToken(), hid.value, hnome.value);
        } else {
            resp = await taskService.novo(getToken(), hnome.value);
        }
        if (resp.status) {
            atualizaTarefas()
            hid.value = '';
            hnome.value = '';
        } else {
            deslogar()
        }
    })

    function deslogar() {
        localStorage.removeItem("token")
        atualizaTarefas()
        atualizaForms()
    }

    document.querySelector("form#flogin").addEventListener("submit", async (evt) => {
        evt.preventDefault()
        let user = document.querySelector("#iusuario").value
        let pass = document.querySelector("#isenha").value
        if (user && pass) {
            let resp = await taskService.login(user, pass)
            if (resp.status) {
                localStorage.setItem("token", resp.token);
                atualizaTarefas()
                atualizaForms()
            } else {
                document.querySelector("#msgerro").innerHTML = resp.msg;
            }
        }
    })

    document.querySelector("#deslogar").addEventListener("click", () => {
        deslogar();
    })

    atualizaForms()
})