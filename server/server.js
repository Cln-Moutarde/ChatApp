import { Server } from 'socket.io';

const io = new Server(3001, {
	cors: {
		origin: '*',
		methods: ['GET', 'POST'],
	},
});

io.on('connection', (socket) => {
	console.log('New user connected');
	socket.emit('msg', 'Hello World');
});
