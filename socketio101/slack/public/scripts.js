const socket = io("http://localhost:9000")


console.log(socket.io)

socket.on('connect', () => {
    console.log(socket.id)
})

socket.on('nsList', (nsData) => {
    //console.log('ns data has arrived')
    let namespacesDiv = document.querySelector(".namespaces")
    namespacesDiv.innerHTML = ""
    nsData.forEach((ns) => {
        namespacesDiv.innerHTML += `<div class="namespace" ns=${ns.endpoint}><img src="${ns.img}"></div>`
    })

    console.log(document.getElementsByClassName('namespace'));

    Array.from(document.getElementsByClassName('namespace')).forEach((element) => {
        element.addEventListener('click', (e) => {
            const nsEndpoint = element.getAttribute('ns')
            console.log(`${nsEndpoint} i should go now`)
        })
    })

})



socket.on('messageFromServer', (dataFromServer) => {
    console.log(dataFromServer)

    socket.emit('messageToServer', {
        data: 'hi..data from the client'
    })


    document.querySelector('#message-form').addEventListener('submit', (event) => {
        event.preventDefault()
        const newMessage = document.querySelector('#user-message').value
        socket.emit('newMessageToServer', { text: newMessage })
    })

    socket.on('messageToClients', (msg) => {
        console.log(msg)
        document.querySelector('#messages').innerHTML += `<li>${msg.text}</li>`
    })
})
