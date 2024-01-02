const Mailgen = require("mailgen")
const nodemailer = require("nodemailer")

exports.Email = (req, res) => {
    try {
        const { userLoginLink } = req.body;
        console.log(userLoginLink)
        let config = {
            service: "gmail",
            auth: {
                user: "tejas.spitertech@gmail.com",
                pass: "sbizasygivyilumk"
            }
        }

        let transporter = nodemailer.createTransport(config);
        let mailGenerator = new Mailgen({
            theme: "default",
            product: {
                name: "Spitertech Solutions",
                link: "https://mailgen.js/"
            }
        });

        let response = {
            body: {
                name: "Tejas Saykar",
                table: {
                    data: [
                        {
                            item: "New Registration",
                            description: "Click the link to approve the registration",
                            link: userLoginLink
                        }
                    ]
                },
                outro: "Registration Authentication"
            }
        }

        let mail = mailGenerator.generate(response);
        let message = {
            from: "tejas.spitertech@gmail.com",
            to: "tejassaykar2001@gmail.com",
            subject: { userLoginLink },
            html: mail
        }

        transporter.sendMail(message).then((info) => {
            return res.status(201).json({
                msg: "You should receive an email",
                mail: info.response
            })
        }).catch(err => {
            return res.status(500).json({ err });
        })
    } catch (error) {
        console.log(error)
    }
}