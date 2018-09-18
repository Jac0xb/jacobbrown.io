var express = require('express');
var app = express();
var path = require('path');


app.set('view engine', 'ejs');

app.use(express.static(path.resolve('../client/dist/')));

app.get('/', function(req, res) {
    res.render("index.ejs");
});

app.listen(8080);
console.log('8080 is the magic port');

