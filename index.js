let express = require('express');
let socket = require('socket.io');
// App setup

let app = express();
let server = app.listen(4000, () => console.log('Listening to requests on port 4000'));


app.use(express.static('public'));


let io = socket(server);

io.on('connection', socket => {
    console.log('Made socket connection', socket.id);

    socket.on('chat', data => {
        io.sockets.emit('chat', data);
    });


    socket.on('tipka', data => {
        socket.broadcast.emit('tipka', data);
    });

    socket.on('ne-tipka', () => {
        socket.broadcast.emit('ne-tipka');
    });
});




