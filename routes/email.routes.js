const { Router } = require("express");
const nodemailer = require("nodemailer");
const hbs = require('nodemailer-express-handlebars')
const config = require("../config/config");
const path = require('path')

const router = Router();

router.get("/getInfo", async (req, res) => {
    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: config.EMAIL,
                pass: config.EMAIL_PASSWORD,
            },
        });

        const handlebarOptions = {
            viewEngine: {
                partialsDir: path.resolve('./email-template/'),
                defaultLayout: false,
            },
            viewPath: path.resolve('./email-template/'),
        };

        transporter.use('compile', hbs(handlebarOptions))

        const mailOptions = {
            from: config.EMAIL,
            to: "stasrudenko@ukr.net",
            subject: "Sending Email using Node.js",
            template: 'email',
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                res.json({ message: error });
                console.log(error)
            } else {
                res.json({ message: "Successfully delivered" });
            }
        });
    } catch (e) {
        res.status(500).json({ message: "Something is wrong" });
    }
});

module.exports = router;
