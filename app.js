const express = require('express');

const app = express();

const fs = require('fs');

app.use(express.static('public'))


function render(template, res) {
    //read from  the template files
   let fileContents = fs.readFileSync(`./views/${template}.html`, {encoding: "utf8"});
    //write out to the response
    res.send(fileContents)
}


app.get('/', (req, res) => {
  render("index", res);
  render()
})


app.post('/', (req, res) => {
  console.log(req.body)
})


app.listen(3000, () => {
  console.log("Server listening on port 3000: ")
});
