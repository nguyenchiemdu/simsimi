const axios = require('axios');

async function messagerConnect(app, port) {
    const http = require('http').createServer(app)
    const io = require('socket.io')(http);
    var listSocketId = []
    io.on('connection', socket => {
        listSocketId.push(socket.id)
        socket.join(socket.id)
        //Leave the room if the user closes the socket
        socket.on('disconnect', () => {
            listSocketId = listSocketId.filter(
                item => item !== socket.id
            )
            socket.leave(socket.id)

        })
        //Send message to only a particular user
        socket.on('send_message', async message => {
            try {
                let uri = `https://tuanxuong.com/api/simsimi/index.php?text=${message.text}`;
                uri = encodeURI(uri);
                let response = await axios.get(uri)
                    .catch(error => {
                        console.log(error);
                    });
                console.log(response)
                io.in(socket.id).emit('receive_message', {
                    text: response?.data?.response
                })
            } catch (error) {
                io.in(socket.id).emit('receive_message', {
                    text: "Simsimi khôn hiểu được tin nhắn này!"
                })
             }
        })
    });
    http.listen(port)

    console.log('Socket started!')

}
module.exports = messagerConnect