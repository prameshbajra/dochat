let express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    server = require('http').createServer(app),
    io = require("socket.io").listen(server);
let usernames = ["<b>Users</b><br/>"];
let port = process.env.PORT || 8080;

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
        if (!usernames.includes(name)) {
            callback(true);
            socket.username = name;
            usernames.push(socket.username);
            io.emit("usernames", usernames);
        } else {
            callback(false);
        }
    });
    socket.on("message", (message) => {
        io.emit("message", { message: message, name: socket.username });
    });
    socket.on("disconnect", (value) => {
        if (!socket.username)
            return;
        usernames.splice(usernames.indexOf(socket.username), 1);
        io.emit("usernames", usernames);
    });
});