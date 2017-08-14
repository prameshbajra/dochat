var socket;

function setup() {
    createCanvas(windowWidth, windowHeight);
    background(0);
    socket = io.connect();
    socket.on("Mouse", drawing);
}

function drawing(messageData) {
    fillColor(messageData.color);
    ellipse(messageData.x, messageData.y, messageData.thick, messageData.thick);
}

function mouseDragged() {
    fillColor();
    ellipse(mouseX, mouseY, thick, thick);
    var dataToSend = {
        x: mouseX,
        y: mouseY,
        color: color,
        thick: thick
    };
    socket.emit("Mouse", dataToSend);
}

function draw() {
}

// Fill color function ...
let fillColor = (color) => {
    switch (color) {
        case 'white': fill(255, 255, 255); break;
        case 'red': fill(255, 0, 0); break;
        case 'green': fill(0, 255, 0); break;
        case 'blue': fill(0, 0, 255); break;
        case 'eraser': fill(0, 0, 0); break;
        default: fill(random(1, 255), random(1, 255), random(1, 255))
    }
}