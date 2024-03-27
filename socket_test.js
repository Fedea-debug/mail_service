const io = require('socket.io-client');
const socket = io('url'); // Set your url

socket.on('connect', () => {});

socket.on('emailCreated', (data) => {
  console.log('Notification received:', data);
  //socket.disconnect();
});

socket.on('disconnect', () => {
  console.log('Disconnected from the server');
});

socket.on('connect_error', (err) => {
  console.log('Connection failed:', err);
});
