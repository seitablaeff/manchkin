const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static('public'));

let users = {};

io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    socket.on('joinRoom', ({ room, username }) => {
        socket.join(room);
        if (!users[room]) {
            users[room] = [];
        }
        users[room].push({ id: socket.id, username: username });
        io.to(room).emit('updateUserList', users[room]);
        console.log(`${username} joined room ${room}`);
    });

    socket.on('chatMessage', (data) => {
        console.log('Chat message received:', data);
        io.to(data.room).emit('chatMessage', { username: data.username, message: data.message });
        console.log('Forwarded chat message to room:', data.room);
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected:', socket.id);
        for (let room in users) {
            let index = users[room].findIndex(user => user.id === socket.id);
            if (index !== -1) {
                users[room].splice(index, 1);
                io.to(room).emit('updateUserList', users[room]);
                console.log(`User ${socket.id} left room ${room}`);
            }
        }
    });
});

server.listen(3000, () => {
    console.log('Server is listening on port 3000');
});
