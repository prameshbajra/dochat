$(document).ready(() => {
    let chat = $('.chat'),
        name = $('#name'),
        users = $('#users'),
        error = $('#error'),
        indexForm = $('#indexForm'),
        nameEnter = $('.nameEnter'),
        formMessage = $('#formMessage'),
        messageField = $('#messageField');

    let socket = io.connect();

    error.hide();
    chat.hide();

    indexForm.submit((e) => {
        e.preventDefault();
        nameEnter.fadeOut(1000);
        socket.emit("username", name.val(), (value) => {
            console.log(value);

            if (value) {
                nameEnter.fadeOut(1000);
                chat.slideDown(1000, () => {
                    messageField.focus();
                });
            } else {
                error.slideDown(1000);
                error.html("Username already taken ...");
            }
        });
    });
    formMessage.submit((e) => {
        e.preventDefault();
        socket.emit("message", messageField.val());
        messageField.val("");
    });

    // Socketing ...
    socket.on("message", (message) => {
        chat.append(message + "<br/>");
    });

    socket.on("usernames", (usernames) => {
        let htmlUsers = "";
        for (let i = 0; i < usernames.length; i++) {
            htmlUsers += usernames[i];
        }
        users.html(htmlUsers);
    });
});