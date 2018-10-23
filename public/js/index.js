var socket = io();

socket.on('connect', function () {
    console.log('Connected to server');  
});

socket.on('disconnect', function () {
    console.log('Disconnected from server');            
});

socket.on('newMessage', function (message) {
    let formatedTime = moment(message.createdAt).format('H:mm');
    let li = $('<li></li>');
    li.text(`${message.from} ${formatedTime}: ${message.text}`);
    $('#messages').append(li);
});

socket.on('newLocationMessage', function(message) {
    let formatedTime = moment(message.createdAt).format('H:mm');
    let li = $('<li></li>');
    let a = $('<a target="_black">My current location</a>');
    li.text(`${message.from} ${formatedTime}: `);
    a.attr('href', message.url);
    li.append(a);
    $('#messages').append(li);
})

const messageTextBox = $('[name=message');
$('#message_form').on('submit', function(e) {
    e.preventDefault();
    socket.emit('createMessage', {
        from: 'user',
        text: messageTextBox.val()
    }, function () {
        messageTextBox.val('');
    });
});

const locationButton = $('#send_location');
locationButton.on('click', function() {
    if(!navigator.geolocation) 
        return alert('Geolocation not supported by your browser.')
    
    locationButton.attr('disabled', 'disabled').text('Sending location...');
    navigator.geolocation.getCurrentPosition(function (position) {
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
        locationButton.removeAttr('disabled').text('Send location');        
    }, function() {
        locationButton.removeAttr('disabled').text('Send location');        
        alert('Unable to fetch location')
    });
});