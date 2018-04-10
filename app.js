const express = require('express');

const app = express();

const fs = require('fs');

const bodyParser = require('body-parser')

const path = require('path');

const sendEmail = require('./email.js').sendEmail;


app.use(express.static(path.join(__dirname, '/public')))

app.use(bodyParser.urlencoded({extended: true}))

// app.use(favicon(path.join(__dirname, 'public', 'images' 'favicon.ico')))

app.use('/favicon.ico', express.static('images/favicon.ico'));


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
  let contactInfo = req.body;
  if (Object.keys(contactInfo).length < 4) {
    res.send("Invalid message: please fill out all fields")
  } else {
    let msg = `From: ${contactInfo.fullName} <${contactInfo['contact-email']}> \nTo: Christian Lowe <christglowe@gmail.com>\n
    ${contactInfo['contact-message']}\n
    ${contactInfo['contact-number']}
    `;
    console.log(msg)
    sendEmail(msg)
  }
  res.end();

})


app.listen(process.env.PORT || 3000, () => {
  console.log("Server listening on port 3000: ")
});
