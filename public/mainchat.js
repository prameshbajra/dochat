$(document).ready(() => {
    // getting DOM Elements ....
    let messageField = $("#messageField"),
        formMessage = $("#formMessage"),
        users = $('#users'),
        errorWell = $('#error'),
        chat = $("#chat"),
        name = $('#name'),
        indexButton = $('#indexButton'),
        indexForm = $('#indexForm');
    let socket = io.connect();

    // For name hanney page ...
    errorWell.hide();

    indexForm.submit((e) => {
        socket.emit("username", name.val());
    });

    // Chat ma vako form ko lai ho yo ...
    formMessage.submit((e) => {
        e.preventDefault();
        console.log("This submit part running ...");
        socket.emit("message", { message: messageField.val() });
        messageField.val("");
    });

    // Incoming messages receving ...

    socket.on("username", (newName) => {
        // Think for this ...
    });

    socket.on("newMsg", (newMsg) => {
        chat.append(newMsg.message);
    });


});

