module.exports = (io) => {

    const usernames = [];

    io.on('connection', socket => {
        console.log('New client connected');
        socket.on('disconnect', () => {
            console.log('Client disconnected');
        });

        socket.on('send message', (data) => {
            io.sockets.emit('new message', {
                msg: data,
                username: socket.username
            })
            
        })

        socket.on('new user', (data, callback) => {
            if(usernames.indexOf(data) != -1){
                callback(false);
                console.log(usernames)

            }else{
            callback(true);
            socket.username = data;
            usernames.push(socket.username);
            io.sockets.emit('get users', usernames);
            console.log(data)
            console.log(usernames)

            }
        })

    });


}