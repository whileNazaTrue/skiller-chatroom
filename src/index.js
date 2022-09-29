const express = require('express');
const app = express();
const path = require('path');

const server = require('http').createServer(app);
const io = require('socket.io')(server);
const mailRoute = require("./routes/mail.js")
const morgan = require("morgan")

require('./socket')(io);


app.use(express.static(path.join(__dirname,'public')));
app.use(express.json())
app.use(morgan("dev"))


app.use("/mail", mailRoute)


app.get('/mails', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/mail/mail.html'));
})


app.use("*", (req, res) => {
    res.redirect("/")
})


server.listen(process.env.PORT || 3000, () => {
    console.log('Server started')
});
