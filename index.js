const express = require('express')
const app = express()
app.use(express.json())

const uuid = require('uuid')
const port = 3000



const todosPedidos = []

const checkOrdersId = (request, response, next) => {
    const { id } = request.params

    const index = todosPedidos.findIndex(pedido => pedido.id === id)

    if (index < 0) {
        return response.status(404).json({ Error: "Usuário não encontrado" })
    }

    request.orders = index
    request.ordersId = id


    next()
}

const checkMethodURL = (request, response, next) => {
    console.log(request.method)
    console.log(request.url)



    next()
}

app.post('/todosPedidos', checkMethodURL,(request, response) => {
    const { order, clienteName, price, status } = request.body

    const novoPedido = { id: uuid.v4(), order, clienteName, price, status }

    todosPedidos.push(novoPedido)

    return response.status(201).json(todosPedidos)

})

app.get('/todosPedidos',checkMethodURL, (request, response) => {
    return response.json(todosPedidos)
})

app.put('/todosPedidos/:id', checkOrdersId,checkMethodURL, (request, response) => {
    const { order, clienteName, price, status } = request.body
    const index = request.orders
    const id = request.ordersId

    const pedidoAtualizado = { id, order, clienteName, price, status }

    todosPedidos[index] = pedidoAtualizado

    return response.json(pedidoAtualizado)
})

app.delete('/todosPedidos/:id', checkOrdersId, checkMethodURL,(request, response) => {
    const index = request.orders
    const id = request.ordersId

    todosPedidos.splice(index, 1)


    return response.status(204).json()
})

app.get('/todosPedidos/:id', checkOrdersId,checkMethodURL,(request, response) => {
    const index = request.orders
    const id = request.ordersId

    return response.status(201).json(todosPedidos[index])
})


app.patch('/todosPedidos/:id', checkOrdersId,checkMethodURL, (request, response) => {
    const index = request.orders
    const id = request.ordersId

    todosPedidos[index].status = "pronto"


    return response.json(todosPedidos[index])
})











app.listen(port, () => {
    console.log(`Rodando na porta ${port}`)
})

