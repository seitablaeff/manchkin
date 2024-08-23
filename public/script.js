// script.js
document.addEventListener('DOMContentLoaded', function() {
    var form = document.getElementById('form');

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        var username = document.getElementById('username').value;
        var roomNumber = document.getElementById('roomNumber').value;

        // Получение текущего списка пользователей из localStorage
        var usersList = JSON.parse(localStorage.getItem('usersList')) || [];

        // Добавление нового пользователя в список
        usersList.push({ username: username, roomNumber: roomNumber });

        // Сохранение обновленного списка пользователей
        localStorage.setItem('usersList', JSON.stringify(usersList));

        // Сохранение текущего пользователя отдельно (если нужно)
        localStorage.setItem('currentUser', JSON.stringify({ username: username, roomNumber: roomNumber }));

        // Redirect to game page
        window.location.href = 'game.html';

        // Соединение с сервером
        var socket = io();
        socket.emit('join room', { username: username, roomNumber: roomNumber });
    });
});
