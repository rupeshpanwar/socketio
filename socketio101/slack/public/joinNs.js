
  function joinNs(endpoint) {
   //join 2nd NS
    nsSocket = io(`http://localhost:9000${endpoint}`)
    //updating the DOM for rooms
    nsSocket.on('nsRoomLoad',(nsRooms)=>{
        let roomList = document.querySelector('.room-list')
        roomList.innerHTML = ""
        nsRooms.forEach((room)=>{
            let glyph
            if(room.privateRoom){
                glyph = 'lock'
            }
            else{
                glyph = 'globe'
            }

            roomList.innerHTML += `<li class="room"><span class="glyphicon glyphicon-${glyph}"></span>${room.roomTitle}</li>`
        }) 

        //add click listener to each room
        let roomNodes = document.getElementsByClassName('room')
        Array.from(roomNodes).forEach((element) =>{
            element.addEventListener('click',(e)=>{
                console.log("someone clicked ",e.target.innerText)
            })
        })

        //join room automatically ..first time here
        const topRoom = document.querySelector('.room')
        const topRoomName = topRoom.innerText
        console.log(topRoomName)
        joinRoom(topRoom)
    })

    
    nsSocket.on('messageToClients', (msg) => {
        console.log(msg)
        document.querySelector('#messages').innerHTML += `<li>${msg.text}</li>`
    })

    document.querySelector('.message-form').addEventListener('submit', (event) => {
        event.preventDefault()
        const newMessage = document.querySelector('#user-message').value
        socket.emit('newMessageToServer', { text: newMessage })
    })

}
