let color = "white",
    thick = 10;

$('document').ready(() => {
    let modal = $('.modal'),
        settingsButton = $('#settingsButton'),
        close = $('.close, #closeButton, #saveChangeButton'),

        redColor = $('.redColor'),
        greenColor = $('.greenColor'),
        blueColor = $('.blueColor'),
        randColor = $('.randColor'),
        eraser = $('.eraser'),

        tenThick = $('.tenThick'),
        twentyThick = $('.twentyThick'),
        thirtyThick = $('.thirtyThick'),
        fourtyThick = $('.fourtyThick'),
        fiftyThick = $('.fiftyThick');

    settingsButton.on('click', () => {
        modal.slideDown();
    });
    close.bind('click', () => {
        modal.slideUp();
    });
    // Color selection below this ...
    redColor.on('click', () => {
        color = "red";
    });
    greenColor.on('click', () => {
        color = "green";
    });
    blueColor.on('click', () => {
        color = "blue";
    });
    randColor.on('click', () => {
        color = "rand";
    });
    eraser.on('click', () => {
        color = "eraser";
    });
    // Thickness selection below this ...

    tenThick.on('click', () => {
        thick = 5;
    });
    twentyThick.on('click', () => {
        thick = 10;
    });
    thirtyThick.on('click', () => {
        thick = 20;
    });
    fourtyThick.on('click', () => {
        thick = 40;
    });
    fiftyThick.on('click', () => {
        thick = 50;
    });
});
