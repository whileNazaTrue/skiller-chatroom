module.exports = (io) => {
    const fs = require('fs');
    if (!fs.existsSync('users.json')) {
        fs.writeFileSync('users.json', JSON.stringify({}));
    }
    
    const usernames = Object.keys(JSON.parse(fs.readFileSync('users.json')));


    io.on('connection', socket => {
        console.log('New client connected');

        let room = "General";
        socket.join(room);

        socket.on('disconnect', () => {
            console.log('Client disconnected');
        });

        socket.on('send message', (data) => {
            
            io.sockets.in(room).emit('new message', {
            msg: data,
            username: socket.username
        })
        console.log(data)
        
        if (!fs.existsSync(`${room}.json`)) {
            fs.writeFileSync(`${room}.json`, JSON.stringify([]));
        }
        let messages = JSON.parse(fs.readFileSync(`${room}.json`));
        messages.push({
            msg: data,
            username: socket.username
        });
        fs.writeFileSync(`${room}.json`, JSON.stringify(messages));
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
            fs.writeFileSync('users.json', JSON.stringify(usernames));
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