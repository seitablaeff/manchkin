document.addEventListener('DOMContentLoaded', function() {
    var form = document.getElementById('form');

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        var username = document.getElementById('username').value;
        var roomNumber = document.getElementById('roomNumber').value;

        // Save user data in localStorage
        localStorage.setItem('username', username);
        localStorage.setItem('roomNumber', roomNumber);

        // Redirect to game page
        window.location.href = 'game.html';
    });
});
