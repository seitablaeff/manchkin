// server.js
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

    socket.on('joinRoom', (roomId) => {
        socket.join(roomId);
        if (!users[roomId]) {
            users[roomId] = [];
        }
        users[roomId].push(socket.id);
        io.to(roomId).emit('updateUserList', users[roomId]);
    });

    socket.on('chatMessage', (data) => {
        io.to(data.room).emit('chatMessage', { id: socket.id, message: data.message });
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected:', socket.id);
        for (let room in users) {
            let index = users[room].indexOf(socket.id);
            if (index !== -1) {
                users[room].splice(index, 1);
                io.to(room).emit('updateUserList', users[room]);
            }
        }
    });
});

server.listen(3000, () => {
    console.log('Server is listening on port 3000');
});