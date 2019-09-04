// make connection

let socket = io.connect('http://localhost:4000');

// query DOM

let message = document.getElementById('message');
let handle = document.getElementById('handle');
let btn = document.getElementById('send');
let output = document.getElementById('output');
let feedback = document.getElementById('feedback');


// emit events

btn.addEventListener('click', () => {
    socket.emit('chat', {
        message: message.value,
        handle: handle.value
    });
});

message.addEventListener('keypress', () => {
    socket.emit('tipka', handle.value);
});

message.addEventListener('focusout', () => {
    socket.emit('ne-tipka');
});
// Listen for events

socket.on('chat', data => {
    feedback.innerHTML = "";
    message.value = "";
    output.innerHTML += "<p><strong>" + data.handle + ": </strong>" + data.message + "</p>";
});

socket.on('tipka', data => {
    feedback.innerHTML = "<p><em> " + data + " tipka ...</em></p>"
});

socket.on('ne-tipka', () => {
    feedback.innerHTML = " ";
})

