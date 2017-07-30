var socket;

$('document').ready(() => {
    let modal = $('.modal'),
        settingsButton = $('#settingsButton'),
        close = $('.close, #closeButton');

    settingsButton.on('click', () => {
        modal.slideDown();
    });
    close.bind('click', () => {
        modal.slideUp();
    });
});

function setup() {
    createCanvas(windowWidth, windowHeight);
    background(0);
    socket = io.connect();
    socket.on("Mouse", drawing);
}

function drawing(messageData) {
    fill(random(1, 255), random(1, 255), random(1, 255));
    ellipse(messageData.x, messageData.y, 10, 10);
}

function mouseDragged() {
    console.log("Sending :: " + mouseX + " , " + mouseY);
    fill(random(1, 255), random(1, 255), random(1, 255));
    ellipse(mouseX, mouseY, 10, 10);
    var dataToSend = {
        x: mouseX,
        y: mouseY
    };
    socket.emit("Mouse", dataToSend);
}

function draw() {
}