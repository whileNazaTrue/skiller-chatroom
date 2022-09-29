
const transporter = require("../utils/mailer.js");
const fs = require("fs")
const Router = require("express").Router

const router = Router()

router
    .get("/", (req, res) => {
        const data = fs.readFileSync("mail.json", "utf-8")
        res.json(JSON.parse(data))
    })

    .post("/", async (req, res) => {
        const mail = req.body
        const { from, to, subject, text, html } = mail

        if(!from || !to || !subject || !text || !html) {
            return res.status(400).send("Faltan datos")
        }

        

        const sentMail = await transporter.sendMail(mail)

        if(sentMail) {
            if(fs.existsSync("mail.json")) {
                const mails = JSON.parse(fs.readFileSync("mail.json", "utf-8"))
                mails.push(sentMail)
                fs.writeFileSync("mail.json", JSON.stringify(mails))
            } else {
                fs.writeFileSync("mail.json", JSON.stringify([sentMail]))
            }
        }

        res.status(201).send("Mail enviado exitosamente!")
    })

module.exports = router