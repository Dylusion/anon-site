const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

// Link HTML client-side
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Connection
io.on('connection', (socket) => {
    // Chat message handle
    socket.on('chat message', (msg) => {
        console.log('[LOGS] message: ' + msg);
        if (msg.includes('devDebugSocket')) {
            io.emit(socket)
        }
        io.emit('chat message', msg);
    });
    // Connect message
    socket.broadcast.emit('chat message', 'A new user has connected, say hi!');
    console.log("[SOCKET] A user has connected to the socket");

    // Disconnect event
    socket.on('disconnect', (reason) => {
        socket.broadcast.emit('chat message', 'A user has disconnected.');
        console.log('[SOCKET] A user has disconnected from the socket.');
    });
});


// For local hosting
server.listen(3000, () => {
    console.log('Listening on port: 3000');
});


/*
TO DO

Add Usernames
Account system

Direct Messages
Servers

Clean up website design
*/
