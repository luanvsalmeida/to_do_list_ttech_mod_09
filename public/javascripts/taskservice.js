let taskService = {
    lista: async function() {
        const response = await fetch('/api/tasks')
        return await response.json()
    },
    busca: async function(id) {
        const response = await fetch('/api/tasks/' + id)
        return await response.json()
    },
    novo: async function(token, nome) {
        const data = {
            method: 'POST',
            headers: {'Content-type': 'application/json',
                      'Authorization': 'Bearer: ' + token },
            body: JSON.stringify({nome: nome})
        }
        const response = await fetch('/api/tasks', data)
        return await response.json()
    },
    altera: async function(token, id, nome) {
        const data = {
            method: 'PUT',
            headers: {'Content-type': 'application/json',
            'Authorization': 'Bearer: ' + token},
            body: JSON.stringify({nome: nome})
        }
        const response = await fetch('/api/tasks/'+id, data)
        return await response.json()
    },
    exclui: async function(token, id) {
        const response = await fetch('/api/tasks/'+id, 
            {
                method: 'DELETE', 
                headers: {'Authorization': 'Bearer: ' + token},
            }
        )
        return await response.json()
    },
    login: async function (user, password) {
        const data = {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({user: user, password: password})
        }
        const response = await fetch('/api/tasks/login', data)
        return await response.json()
    }
}

export default taskService