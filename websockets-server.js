import http from "http";

import {Server} from "socket.io";

// make new server with basic http
const server = http.createServer();

// make new socket.io server connected to that server
const io = new Server(server, {
	cors: {
		origin: '*'
	}
});

// when a new user connects
io.on('connection', (socket) => {
	console.log('a user connected');

	// when there's a new message
	socket.on('chat message', (msg) => {
		console.log('message: ' + msg);
	});

});

const PORT = 3001;

server.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
