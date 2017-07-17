let express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    server = require('http').createServer(app),
    mongoose = require("mongoose"),
    io = require("socket.io").listen(server);
let usernames = {};
let port = process.env.PORT || 8080;

mongoose.connect("mongodb://localhost/chat", () => {

});

server.listen(port);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/jsjquery", express.static(__dirname + "/node_modules/jquery/dist/"));
app.use("/css", express.static(__dirname + "/node_modules/bootstrap/dist/css/"));
app.use("/js", express.static(__dirname + "/node_modules/bootstrap/dist/js/"));
app.use("/socket.io", express.static(__dirname + "/node_modules/socket.io/socket.io-client/dist/"));
app.use("/index", express.static(__dirname + "/"))

app.get('/', (req, res, next) => {
    res.sendFile(__dirname + "/index.html");
});

// Socketing ...
io.sockets.on("connection", (socket) => {
    socket.on("username", (name, callback) => {
        if (name in usernames) {
            callback(false);
        } else {
            callback(true);
            socket.username = name;
            usernames[socket.username] = socket;
            io.emit("usernames", Object.keys(usernames));
        }
    });
    socket.on("message", (message, callback) => {
        message = message.trim();

        // Whisper code below ...
        if (message.substring(0, 3) === "/w ") {
            message = message.substring(3);
            let indexSpace = message.indexOf(" ");
            if (indexSpace !== -1) {
                let name = message.substring(0, indexSpace);
                message = message.substring(indexSpace + 1);
                if (name in usernames) {
                    usernames[name].emit("whisper", { message: message, name: socket.username });
                } else {
                    callback("Enter a valid user !!!");
                }
            } else {
                callback("Please, enter the whisper message");
            }
        } else {
            callback(true);
            io.emit("message", { message: message, name: socket.username });
        }
    });
    socket.on("disconnect", (value) => {
        if (!socket.username)
            return;
        delete usernames[socket.username];
        io.emit("usernames", usernames);
    });
});