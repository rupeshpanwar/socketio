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
// loop through each namespace and listen for a connection
namespaces.forEach((namespace)=>{
    // console.log(namespace)
    // const thisNs = io.of(namespace.endpoint)
    io.of(namespace.endpoint).on('connection',(nsSocket)=>{
        console.log(nsSocket.handshake)
        const username = nsSocket.handshake.query.username;
        // console.log(`${nsSocket.id} has join ${namespace.endpoint}`)
        // a socket has connected to one of our chatgroup namespaces.
        // send that ns gorup info back
        nsSocket.emit('nsRoomLoad',namespace.rooms)
        nsSocket.on('joinRoom',(roomToJoin,numberOfUsersCallback)=>{
            // deal with history... once we have it
            console.log(nsSocket.rooms);
            nsSocket.join(roomToJoin)
            io.of('/wiki').in(roomToJoin).clients((error, clients)=>{
                console.log(clients.length)
                numberOfUsersCallback(clients.length);
            })
         
        })
    })
})
