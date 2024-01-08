const Mailgen = require("mailgen")
const nodemailer = require("nodemailer")

exports.userEmail = (req, res) => {
    try {
        const { purchaserName, purchaserEmail, productName } = req.body;
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
                name: "Shri Rupesh Pawar Foundation",
                link: "https://mailgen.js/"
            }
        });

        let response = {
            body: {
                name: purchaserName,
                table: {
                    data: [
                        {
                            item: "New Product Registration",
                            ProductName: productName,
                        }
                    ]
                },
                outro: "Product Registration"
            }
        }

        let mail = mailGenerator.generate(response);
        let message = {
            from: "tejas.spitertech@gmail.com",
            to: "tejassaykar2001@gmail.com",
            subject: "Product Registration",
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