const express = require('express')

const socketio = require('socket.io')

const namespaces = require('./data/namespaces')
//console.log(namespaces)

const app = express()
app.use(express.static(__dirname + '/public'))


const expressServer = app.listen(9000)

const io = socketio(expressServer)

io.on('connection', (socket) => {
    //build array of NS
    let nsData = namespaces.map((ns) => {
        return {
            img: ns.img,
            endpoint: ns.endpoint
        }
    })
    //send the NS list to the client who connects but not all
    socket.emit('nsList', nsData)

})

//initialize NS
namespaces.forEach((namespace) => {
    //console.log(namespace)
    io.of(namespace.endpoint).on('connection', (socket) => {
        console.log(`${socket.id} has join ${namespace.endpoint}`)
    })
})