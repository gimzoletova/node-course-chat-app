var socket = io();

socket.on('connect', function () {
    console.log('Connected to server');  
    
    // socket.emit('createMessage', {
    //     from: 'client',
    //     text: 'cliect'
    // })
});

socket.on('disconnect', function () {
    console.log('Disconnected from server');            
});

socket.on('newMessage', function (message) {
    console.log('Got new message: ', message);
    let li = $('<li></li>');
    li.text(`${message.from}: ${message.text}`);
    $('#messages').append(li);
});

$('#message_form').on('submit', function(e) {
    e.preventDefault();
    socket.emit('createMessage', {
        from: 'user',
        text: $('[name=message').val()
    }, function (data) {console.log('got it', data);});
});