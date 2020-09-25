const express = require('express')
const bodyParser = require('body-parser')
const nodemailer = require('nodemailer')
const { request } = require('http')
const app = express()


//body parser middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.post('/', (req, res) => {
    nodemailer.createTestAccount( (err, account) => {
        const htmlEmail =`
            <h3>Contact Details</h3>
            <ul>
                <li>Name: ${req.body.name}</li>
                <li>Email: ${req.body.email}</li>
            </ul>
            <h3>Message</h3>
            <p>${req.body.message}</p>`

        let transporter = nodemailer.createTransport({
            host:'smtp.etheral.email',
            port:587,
            secure: 'STARTTLS',
            auth:{
                user:'francesca.bahringer@ethereal.email',
                pass:'62s7aagGA9WvuWxzyw'
            }
        })

        let mailOptions = {
            from: 'test@testaccount.com',
            to: 'francesca.bahringer@ethereal.email',
            replyTo: 'test@testaccount.com',
            subject: 'New message',
            text: req.body.message,
            html: htmlEmail
        }
        
        transporter.sendMail(mailOptions, (err, info) => {
            if(err){
                return console.log(err)
            }

            console.log('Message sent: $s', info.message)
            console.log('Message URL: $s', nodemailer.getTestMessageUrl(info))
        })
    })

    console.log(req.body)
})

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})