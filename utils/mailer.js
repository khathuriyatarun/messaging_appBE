const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'tarunkhathuriya2022@gmail.com',
    pass: 'ezmyoepjfnftnxmk'
  }
});


// @desc      mail handler
// @body      email of reciever, subject and template
exports.sendMail = async (recieverEmail, sub, temp) => {
    const mailOptions = {
        from: 'no-reply@chatapp.com',
        to: recieverEmail,
        subject: sub,
        html: temp
    };

    await transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else console.log('Email sent: ' + info.response);
    });
}

