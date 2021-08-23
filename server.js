/*
express.js - is to create a server
nodemon - is to run server continuously
nodemailer - is to send mails
dotenv - is for making environment variable. We'll use this store our email id and password outside of server.
*/
const express = require('express');
const path = require('path');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
// Setup dotenv so we can access environment variable.
dotenv.config();
// Then store your public folder path to a variable and make server.
let initialPath = path.join(__dirname, "public");
let app = express();
// use app.use method to setup middlewares.
app.use(express.static(initialPath));
app.use(express.json());
/*
They both are important, express.json will enable form data sharing and express.static will set public folder as a static path.
After this make home route. And send index.html file.
*/
app.get('/', (req, res) => {
    res.sendFile(path.join(initialPath, "index.html"));
});

app.listen(3000, () => {
    console.log('listening.....');
});

app.post('/mail', (req, res) => {
    const { firstname, lastname, email, msg } = req.body;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        }
    })

    const mailOptions = {
        from: 'sender email',
        to: 'receiver email',
        subject: 'Postfolio',
        text: `First name: ${firstname}, \nLast name: ${lastname}, \nEmail: ${email}, \nMessage: ${msg}`
    }

    transporter.sendMail(mailOptions, (err, result) => {
        if (err){
            console.log(err);
            res.json('opps! it seems like some error occured please. try again.')
        } else{
            res.json('thanks for e-mailing me. I will reply to you within 24 hours.');
        }
    })
})