import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { createTransport } from "nodemailer";
import dotenv from 'dotenv';


dotenv.config();


const app = express();
const PORT = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(cors());

app.get("/", (req,res)=>{
    res.status(200).send("Server is running");
})

app.post("/send_mail", (req, res) => {

    const {name, email} = req.body;
    const transporter = createTransport({
        host: "smtp-relay.brevo.com",
        port: 587,
        auth: {
            user: process.env.USER_EMAIL,
            pass: process.env.SMTP_API,
        },
    });

    const mailOptions = {
        from: 'shashanktripathi2ndid@gmail.com',
        to: email,
        subject: `Sellerkin Assessment `,
        html:`<h4>Hello ${name}</h4><h1>Thanks for Subscribing! </h1>`,
        text: `Hello ${name},\n Thanks for Subscribing!`
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
            res.status(500).json({status:false, msg:error})
        } else {
            console.log('Email sent: ' + info.response);
            res.status(200).json({status:true, info:info})
        }
    });
})

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});