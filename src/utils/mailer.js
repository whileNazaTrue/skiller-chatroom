const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();


module.exports = transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
    user: process.env.USER_MAIL,
    pass: process.env.USER_PASS
    }
})

transporter.verify().then(() => {
    console.log("Ready to send emails")
})
