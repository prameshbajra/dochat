var socket;
function setup() {
    createCanvas(windowWidth, windowHeight);
    background(0);
    socket = io.connect("localhost:8080");
    socket.on("Mouse", drawing);
}

function drawing(messageData) {
    fill(random(1, 255), random(1, 255), random(1, 255));
    ellipse(messageData.x, messageData.y, 30, 30);
}

function mouseDragged() {
    console.log("Sending :: " + mouseX + " , " + mouseY);
    fill(random(1, 255), random(1, 255), random(1, 255));
    ellipse(mouseX, mouseY, 30, 30);
    var dataToSend = {
        x: mouseX,
        y: mouseY
    };
    socket.emit("Mouse", dataToSend);
}

function draw() {
}