
const nodemailer = require('nodemailer');

const yahoo_pass = require("./config.js").yahoo_pass;

function sendEmail (msg) {

let transporter = nodemailer.createTransport({
        service: 'Yahoo',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: "christian.lowe17@yahoo.com", // generated ethereal user
            pass: yahoo_pass // generated ethereal password
        },
        tls: {
          rejectUnauthorized: false
        }
    });
    // setup email data with unicode symbols
     let mailOptions = {
         from: 'christian.lowe17@yahoo.com', // sender address
         to: 'christglowe@gmail.com', // list of receivers
         subject: msg.subject, // Subject line
         text: msg, // plain text body
         html: `<b> ${msg} <b>` // html body
     };

     // send mail with defined transport object
     transporter.sendMail(mailOptions, (error, info) => {
         if (error) {
             return console.log(error);
         }
         console.log('Message sent: %s', info.messageId);

         // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
     });
}


module.exports.sendEmail = sendEmail;
