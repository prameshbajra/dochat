$(() => {
    let socket = io();
    $('form').submit(() => {
        socket.emit('chat message', $('#m').val());
        $('#m').val('');
        return false;
    });
    socket.on('chat message', function (msg) {
        console.log(msg);
        $('#messages').append($('<li>').text(msg));
    });
});