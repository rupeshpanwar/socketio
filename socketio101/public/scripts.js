const socket = io("http://localhost:9000")
const socket2 = io("http://localhost:9000/admin")

socket.on('connect',()=>{
    console.log(socket.id)
})

socket2.on('connect',()=>{
    console.log(socket2.id)
})

socket.on('messageFromServer', (dataFromServer) => {
    console.log(dataFromServer)

    socket.emit('messageToServer', {
        data: 'hi.. from the client'
    })

    socket.on('joined', (msg) => {
        console.log(msg)
    })

    document.querySelector('#message-form').addEventListener('submit',(event) => {
        event.preventDefault()
        const newMessage = document.querySelector('#user-message').value
        socket.emit('newMessageToServer',{text: newMessage})
    })

    socket.on('messageToClients',(msg) => {
        console.log(msg)
        document.querySelector('#messages').innerHTML += `<li>${msg.text}</li>`
    })
})

//new namespace listener
socket2.on('welcome',(msg) => {
    console.log(`hello from socket2 server - ${msg}`)
})