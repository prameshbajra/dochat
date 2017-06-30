let express = require("express"),
    app = express(),
    bodyParser = require('body-parser'),
    server = require("http").createServer(app),
    io = require("socket.io").listen(server);

app.listen(3000);

// setting up default routes ...
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/jsjquery", express.static(__dirname + "/node_modules/jquery/dist/"));
app.use("/css", express.static(__dirname + "/node_modules/bootstrap/dist/css/"));
app.use("/js", express.static(__dirname + "/node_modules/bootstrap/dist/js/"));
app.use("/socket.io", express.static(__dirname + "/node_modules/socket.io-client/dist"));
app.use("/index", express.static(__dirname + "/public/"));

app.get("/", (req, res, next) => {
    res.sendFile(__dirname + "/public/index.html");
});

app.post("/chat", (req, res, next) => {
    let name = req.body.name;
    console.log(name);
    res.redirect("/");
});