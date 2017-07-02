let express = require("express"),
    app = express(),
    bodyParser = require('body-parser'),
    server = require("http").createServer(app),
    io = require("socket.io").listen(server),
    handlebars = require("express-handlebars");

app.engine(".hbs", handlebars({ defaultLayout: "layout", extname: ".hbs", }));
app.set('view engine', '.hbs');

server.listen(3000);

// setting up default routes ... 
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/jsjquery", express.static(__dirname + "/node_modules/jquery/dist/"));
app.use("/css", express.static(__dirname + "/node_modules/bootstrap/dist/css/"));
app.use("/js", express.static(__dirname + "/node_modules/bootstrap/dist/js/"));
app.use("/socket.io", express.static(__dirname + "/node_modules/socket.io/socket.io-client/dist/"));
app.use("/main", express.static(__dirname + "/public/"));


// Setting Routes ...
app.get("/", (req, res, next) => {
    res.render("index");
});

app.post("/chat", (req, res, next) => {
    res.render("chat");
});


// Socket io ...

io.sockets.on("connection", (socket) => {
    socket.on("username", (name) => {
        io.sockets.emit("username", name);
    })

    socket.on("message", (message) => {
        io.sockets.emit("newMsg", message);
    });
});