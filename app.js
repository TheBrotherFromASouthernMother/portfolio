const express = require('express');

const app = express();

const fs = require('fs');

const bodyParser = require('body-parser')

const path = require('path');

const nodemailer = require('nodemailer');


let transporter = nodemailer.createTransport({
        service: 'Yahoo',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: "christian.lowe17@yahoo.com", // generated ethereal user
            pass: "#UBEFFN:EW" // generated ethereal password
        },
        tls: {
          rejectUnauthorized: false
        }
    });

    // setup email data with unicode symbols
     let mailOptions = {
         from: 'christian.lowe17@yahoo.com', // sender address
         to: 'chritglowe@gmail.com', // list of receivers
         subject: 'Hello', // Subject line
         text: 'Hello world?', // plain text body
         html: '<b>Hello world?</b>' // html body
     };

     // send mail with defined transport object
     transporter.sendMail(mailOptions, (error, info) => {
         if (error) {
             return console.log(error);
         }
         console.log('Message sent: %s', info.messageId);
         // Preview only available when sending through an Ethereal account
         console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

         // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
         // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
     });







app.use(express.static(path.join(__dirname, '/public')))

app.use(bodyParser.urlencoded({extended: true}))


function render(template, res) {
    //read from  the template files
   let fileContents = fs.readFileSync(`./views/${template}.html`, {encoding: "utf8"});
    //write out to the response
    res.send(fileContents)
}


app.get('/', (req, res) => {
  render("index", res);
})

app.get("/:project", (req, res) => {
  let projectName = req.params.project;
  render(projectName, res)
})

app.post('/', (req, res) => {
  console.log(req.body, "Length: ", Object.keys(req.body))
  res.end();

})


app.listen(3000, () => {
  console.log("Server listening on port 3000: ")
});
