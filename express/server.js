var express = require('express');
var server = express();

server.set('view engine', 'ejs');
server.set('port', 3000);
server.listen(3000, function(){
    console.log("Server is running!")
});


server.get('/', function(req, res) {
    res.send("Homepage");
});

server.get('/about', function(req, res) {
    res.send("about us page");
});

server.get('/car', function(req, res) {
    res.send('car')
});

server.get('/car/:brand', function(req, res) { 
    res.render('page', {"pageName": req.params.brand});
});

server.get('/*', function(req, res) {
    res.send('404! The page does not exist');
});