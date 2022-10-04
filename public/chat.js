const socket = io();

const messageContainer = document.getElementById('message-container');
const messageForm = document.getElementById('submit');
const messageInput = document.getElementById('message-input');

const name = prompt('What is your name?');
newmessage('You joined');
socket.emit('new-user', name);

if (!messageForm) console.error('No message form found');

socket.on('chat-message', (message) => {
	newmessage(`${message.name}: ${message.message}`);
});

socket.on('user-connected', (name) => {
	newmessage(`${name} connected`);
});

socket.on('user-disconnected', (name) => {
	newmessage(`${name} disconnected`);
});

messageForm.addEventListener('submit', (e) => {
	e.preventDefault();
	const message = messageInput.value;
	newmessage(`You: ${message}`);
	socket.emit('send', message);
	messageInput.value = '';
});

function newmessage(message) {
	const messageElement = document.createElement('div');
	messageElement.innerText = message;
	messageContainer.append(messageElement);
}
