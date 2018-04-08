const express = require('express');

const app = express();

const fs = require('fs');

const bodyParser = require('body-parser')

app.use(express.static('public'))

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
  reponseObj = {
    image: `${__dirname}/images/${projectName}.png`
  }
  res.send(reponseObj)
})

app.post('/', (req, res) => {
  console.log(req.body, "Length: ", Object.keys(req.body))
  res.end();

})


app.listen(3000, () => {
  console.log("Server listening on port 3000: ")
});
