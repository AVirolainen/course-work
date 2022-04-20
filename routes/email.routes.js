const { Router } = require("express");
const nodemailer = require("nodemailer");
const router = Router();

router.get("/getInfo", async (req, res) => {
    try {
        let testAccount = await nodemailer.createTestAccount();

        let transporter = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: testAccount.user, // generated ethereal user
                pass: testAccount.pass, // generated ethereal password
            },
        });
        let info = await transporter.sendMail({
            from: '"Fred Foo 👻" <foo@example.com>', // sender address
            to: "stasrudenko@ukr.net", // list of receivers
            subject: "Hello ✔", // Subject line
            text: "Hello world?", // plain text body
            html: "<b>Hello world?</b>", // html body
        });

        console.log("Message sent: %s", info.messageId);
        res.json({ message: "done" });
    } catch (e) {
        res.status(500).json({ message: "Something is wrong" });
    }
});

module.exports = router;
