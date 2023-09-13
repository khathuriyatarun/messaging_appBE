const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        // TODO: replace `user` and `pass` values from <https://forwardemail.net>
        user: "purvanshi.singhal@gmail.com",
        pass: "oalsyqpjxcfghdbt",
    },
});

exports.sendMail = async(userEmail, otp) => {
    // send mail with defined transport object
    console.log("in sendMail", userEmail)
    const info = await transporter.sendMail({
        from: 'no-reply@chatapp.com', // sender address
        to: userEmail, // list of receivers
        subject: "Login Credentials", // Subject line
        text: `Hello user this is your ${otp} for login`, // plain text body
    });
    console.log("Message sent: %s", info.messageId);
}
// sendMail().catch(console.error);



// module.exports = sendMail;
