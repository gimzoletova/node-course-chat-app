var socket = io();

function scrollToButtom () { //decides if should scroll down to last message or not. will not scroll if we don't see the last 2
    let messages = $('#messages');
    let newMessage = messages.children('li:last-child');

    let clientHeight = messages.prop('clientHeight');//clientHeight is a prop inside the element that gives the height of the rendered part of the element
    let scrollTop = messages.prop('scrollTop');//scrollTop is a prop inside the element that gives the height of what is above the rendered part of the element
    let scrollHeight = messages.prop('scrollHeight');//scrollHeight is a prop inside the element that gives the height the whole element
    //the 3 lines above are jQuery equivalent to the js down below:
    // let clientHeight = document.getElementById("messages").clientHeight;
    // let scrollTop = document.getElementById("messages").scrollTop;
    // let scrollHeight = document.getElementById("messages").scrollHeight;

    let newMessageHeight = newMessage.innerHeight();
    let lastMessageHeight = newMessage.prev().innerHeight();
    if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        messages.scrollTop(scrollHeight); //jQuery equivalent to the js down below:
        // document.getElementById("messages").scrollTop = scrollHeight;
    }
}

socket.on('connect', function () {
    console.log('Connected to server');
    let params = $.deparam(window.location.search);
    socket.emit    ('join', params, function (err) {
        if(err) {
            alert(err);
            window.location.href = '/';
        }
        else {
            console.log('no error');
            
        }
    });
});

socket.on('disconnect', function () {
    console.log('Disconnected from server');            
});

socket.on('updateUserList', function(users) {
    let ol = $('<ol></ol>')   ;
    users.forEach(function (user) {
        ol.append($('<li></li>').text(user));
    });
    $('#users').html(ol);
});

socket.on('newMessage', function (message) {
    let formattedTime = moment(message.createdAt).format('H:mm');
    let template = $('#message_template').html();
    let html = Mustache.render(template,{
        text: message.text,
        from: message.from,
        createdAt: formattedTime
    });
    $('#messages').append(html);
    scrollToButtom();
    // let formatedTime = moment(message.createdAt).format('H:mm');
    // let li = $('<li></li>');
    // li.text(`${message.from} ${formatedTime}: ${message.text}`);
    // $('#messages').append(li);
});

socket.on('newLocationMessage', function(message) {
    let formattedTime = moment(message.createdAt).format('H:mm');
    let template = $('#location_message_template').html();
    let html = Mustache.render(template,{
        url: message.url,
        from: message.from,
        createdAt: formattedTime
    });
    $('#messages').append(html);
    scrollToButtom();
    // let formatedTime = moment(message.createdAt).format('H:mm');
    // let li = $('<li></li>');
    // let a = $('<a target="_black">My current location</a>');
    // li.text(`${message.from} ${formatedTime}: `);
    // a.attr('href', message.url);
    // li.append(a);
    // $('#messages').append(li);
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