import { Server } from 'socket.io';
import { createServer } from 'node:http';
import express from 'express';

const app = express();

app.use(express.static('public'));

const httpServer = createServer(app);
const port = process.env.PORT || 3000;
const io = new Server(httpServer, {
	cors: {
		origin: '*',
		methods: ['GET', 'POST'],
	},
});

const users = {};

io.on('connection', (socket) => {
	console.log('New user connected');
	socket.on('new-user', (name) => {
		users[socket.id] = name;
		socket.broadcast.emit('user-connected', name);
	});
	socket.on('send', (message) => {
		socket.broadcast.emit('chat-message', {
			message: message,
			name: users[socket.id],
		});
	});
	socket.on('disconnect', () => {
		socket.broadcast.emit('user-disconnected', users[socket.id]);
		delete users[socket.id];
	});
});

function idfunction() {
	const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

	let id = '';

	for (let i = 0; i < 5; i++) {
		id += alphabet[Math.floor(Math.random() * alphabet.length)];
	}

	return id;
}

io.use((socket, next) => {
	const name = socket.handshake.auth.name;
	if (!name) {
		return next(new Error('invalid username'));
	}
	socket.name = name;
	next();
});

httpServer.listen(port);
