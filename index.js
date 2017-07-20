$(document).ready(() => {
    let chat = $('.chat'),
        chatMain = $('#chatMain'),
        name = $('#name'),
        users = $('#users'),
        error = $('#error'),
        sketch = $('#sketch'),
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
                    // Starting the scroll at end with a animation scroll ...
                    $(chatMain).animate({
                        scrollTop: $(chatMain).prop("scrollHeight")
                    }, 1000);
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
        socket.emit("message", messageField.val(), (data) => {
            console.log(`${data}`);
        });
        messageField.val("");
    });

    sketch.click(() => {
        let message = "Let's sketch. <a href = '/index/sketch.html'>Click here </a> to start.";
        socket.emit("message", message, (result) => {
            console.log(`${result}`);
        });
    });

    // Socketing ...
    socket.on("message", (message) => {
        chatMain.append("<b>" + message.name + " : </b>" + message.message + "<br/>");
        // Scroll down for 
        $(chatMain).animate({
            scrollTop: $(chatMain).prop("scrollHeight")
        }, 500);
    });

    socket.on("usernames", (usernames) => {
        let htmlUsers = "<b>Users<b><br><br>";
        for (let i = 0; i < usernames.length; i++) {
            htmlUsers += usernames[i] + "<br/>";
        }
        users.html(htmlUsers);
    });

    socket.on("whisper", (data) => {
        chatMain.append("<pre><b>" + data.name + "</b> : " + data.message + "</pre>");
    });

    socket.on("oldMessages", (message) => {
        message.reverse();
        message.forEach((element) => {
            chatMain.append("<b>" + element.username + " : </b>" + element.message + "<br/>");
        });
    });
});