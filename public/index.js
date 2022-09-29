const socket = io('localhost:3001');
const messageForm = document.getElementById('submit');
const messageInput = document.getElementById('message-input');

if (!messageForm) console.error('No message form found');

socket.on('test', (arg) => {
	console.log(arg);
});

messageForm.addEventListener('submit', e => {
    e.preventDefault();
    const message = messageInput.value;
    socket.emit('send', message);
    messageInput.value = '';
});