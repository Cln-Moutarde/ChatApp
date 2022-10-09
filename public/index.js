const URL = 'http://localhost:3000';
const socket = io(URL, { autoConnect: false });

const validateButton = document.getElementById('joinchat');
const chatid = document.getElementById('chatid').value;
const create = document.getElementById('Create');
let usernameAlreadySelected = false;

socket.onAny((event, ...args) => {
	console.log(event, args);
});

function submitusernamefunction() {
	const name = document.getElementById('username');

	if (name.value == '') {
		alert('Please enter a name');
	} else {
		usernameAlreadySelected = true;
		socket.auth = { name: name.value };
		socket.connect();
		console.log(name.value);
	}
}

socket.on('connect_error', (err) => {
	if (err.message === 'invalid username') {
		this.usernameAlreadySelected = false;
	}
});
