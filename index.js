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
        socket.emit("username", name.val(), (value) => {
            if (value) {
                nameEnter.fadeOut(1000);
                chat.fadeIn(1000, () => {
                    messageField.focus();
                });
            } else {
                error.show();
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
        chat.append("<b>" + message.name + " : </b>" + message.message + "<br/>");
    });

    socket.on("usernames", (usernames) => {
        let htmlUsers = "";
        for (let i = 0; i < usernames.length; i++) {
            htmlUsers += usernames[i] + "<br/>";
        }
        users.html(htmlUsers);
    });
});