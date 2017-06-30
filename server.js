let app = require('express')();
let http = require('http').Server(app);
let io = require('socket.io')(http);
let express = require('express');

app.use('/js', express.static(__dirname + "/public/"));

app.get('/chat', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.get('/draw', (req, res) => {
    res.sendFile(__dirname + '/public/draw.html');
});

io.on('connection', (socket) => {
    console.log("User connected");
    socket.on('chat message', (msg) => {
        console.log('message: ' + msg);
        io.emit('chat message', msg);
    });
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

http.listen(3000, () => {
    console.log('listening on *:3000');
});
