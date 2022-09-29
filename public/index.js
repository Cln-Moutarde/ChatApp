const socket = io('localhost:3001');

socket.on('msg', (arg) => {
	console.log(arg);
});
