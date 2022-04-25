const { Router } = require("express");
const nodemailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");
const config = require("../config/config");
const path = require("path");

const router = Router();

router.get("/getInfo", async (req, res) => {
    try {
        let transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: config.EMAIL || "abc@gmail.com",
                pass: config.EMAIL_PASSWORD || "1234",
            },
            secure: false,
        });

        const handlebarOptions = {
            viewEngine: {
                extName: ".handlebars",
                partialsDir: path.resolve(__dirname, "views"),
                defaultLayout: false,
            },
            viewPath: path.resolve(__dirname, "views"),
            extName: ".handlebars",
        };

        transporter.use("compile", hbs(handlebarOptions));

        let mailOptions = {
            from: config.EMAIL,
            to: "stasrudenko@ukr.net",
            subject: "Nodemailer - Test",
            text: "Wooohooo it works!!",
            template: "index",
        };

        transporter.sendMail(mailOptions, (err, data) => {
            if (err) {
                return console.log(err);
            }
            return console.log("Email sent!!!");
        });
        res.json({ message: "Done" });
    } catch (e) {
        res.status(500).json({ message: "Something is wrong" });
    }
});

module.exports = router;
