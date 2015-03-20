var fs = require('fs');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use('/', express.static(path.join(__dirname, '')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/groceries.json', function(req, res) {
  console.log('get to /groceries son')
  fs.readFile('groceries.json', function(err, data) {
    res.setHeader('Content-Type', 'application/json');
    res.send(data);
  });
});

app.post('/groceries.json', function(req, res) {
  fs.readFile('groceries.json', function(err, data) {
    var groceryList = JSON.parse(data);
    groceryList.push(req.body);
    fs.writeFile('groceries.json', JSON.stringify(groceryList, null, 4), function(err) {
      res.setHeader('Content-Type', 'application/json');
      res.setHeader('Cache-Control', 'no-cache');
      res.send(JSON.stringify(groceryList));
    });
  });
});

app.listen(3000);

console.log('Server started: http://localhost:3000/');