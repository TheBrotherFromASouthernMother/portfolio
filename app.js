const express = require('express');

const app = express();

const fs = require('fs');

const bodyParser = require('body-parser')


const path = require('path');

const sendEmail = require('./email.js').sendEmail;

const promise = require('bluebird');

const initOptions = {
  // Initialization Options
  promiseLib: promise
};

const pgp = require('pg-promise')(initOptions);

const db = pgp({
  connectionString: 'postgres://rhwpebwwswpwxz:3277c450533255f6c24f96af67dab840baf7ba95643a2cec6dcc9bb571479de0@ec2-50-16-196-238.compute-1.amazonaws.com:5432/d7j9r5c9sisj81',
  ssl: true
});



app.use(express.static(path.join(__dirname, '/public')))

app.use(bodyParser.urlencoded({extended: true}))

// app.use(favicon(path.join(__dirname, 'public', 'images' 'favicon.ico')))

// app.use('/favicon.ico', express.static('images/favicon.ico'));


function render(template, res) {
    //read from  the template files
   let fileContents = fs.readFileSync(`./views/${template}.html`, {encoding: "utf8"});
    //write out to the response
    res.send(fileContents)
}


app.get('/', (req, res) => {
  // let socketIP = req.socket.remoteAddress;
  // let connectionIP = req.connection.remoteAddress;
  // let proxyIP = req.headers['x-forwarded-for'] || null;
  // let reference = req.body
  // db.any('INSERT INTO address VALUES (DEFAULT, $1, $2, $3, current_timestamp)', [socketIP, connectionIP, proxyIP]).then( data => {
  //   console.log('sucess', data);
  // }).catch( err => {
  //   console.log(err);
  // })
  render("index", res);
})


app.get('/resume', (req, res) => {
  res.sendFile(`${__dirname}/public/images/tech-resume.pdf`)
})

app.get("/:project", (req, res) => {
  console.log(req.url);
  if (req.url === "/favicon.ico") {
    res.sendFile(`${__dirname}/public/images/favicon.ico`)
  } else {
    let projectName = req.params.project;
    render(projectName, res)
  }

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
    // res.end();
  }
  res.end();

})

app.post('/reference', (req, res) => {
  let reference = req.body.previousPage || 'null';
  console.log(reference)
  db.any("UPDATE address SET reference = $1 WHERE visit = (SELECT MAX(visit) FROM address)", [reference]).then( data => {
    console.log('Sucess', data);
    res.end();
  }).catch( err => {
    console.log(err.stack);
    res.end();
  })

})


app.listen(process.env.PORT || 3000, () => {
  console.log("Server listening on port 3000: ")
});
