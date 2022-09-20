module.exports = (io) => {

    const usernames = [];

    io.on('connection', socket => {
        console.log('New client connected');

        let room = "General";
        socket.join(room);

        socket.on('disconnect', () => {
            console.log('Client disconnected');
        });

        socket.on('send message', (data) => {
            /*
            io.sockets.emit('new message', {
                msg: data,
                username: socket.username
            })
            */
            io.sockets.in(room).emit('new message', {
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

        
        
        socket.on("change room", (data) => {
            socket.leave(room);
            socket.join(data);
            room = data;
            socket.emit("change room", data);
        })

    });


}