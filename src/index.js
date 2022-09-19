const express = require('express');
const app = express();
const path = require('path');

const server = require('http').createServer(app);
const io = require('socket.io')(server);

require('./socket')(io);


app.use(express.static(path.join(__dirname,'public')));




server.listen(process.env.PORT || 3000, () => {
    console.log('Server started')
});
