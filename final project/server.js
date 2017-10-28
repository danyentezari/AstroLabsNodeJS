// Include express node module
var express = require('express');
// Assign values returned from express() to server var 
var server = express();
// Include mongoose node module. This module provides interface with mongoDB client
var mongoose  = require('mongoose');
// Use Schema var as shorthand for mongoose.Schema
var Schema = mongoose.Schema;
// Create a mongoose model for cards collection. 
// This object, cardsModel, has methods for mongoDB 
// (i.e, create, findByIdAndRemove, findIdByAndUpdate, etc.).
var cardsModel = mongoose.model('cards', new Schema({
    title: String,
    body: String,
    date: Date
}, {collection: 'cards'}));

// This conditional is for the local and remote (Heroku) servers.
// The variables dburl and domain will change depending on the server.
if(process.env.NODE_ENV == "production") {
    var dburl = "mongodb://heroku_d0v3j3sw:dbo7h9ik9uonuvhg6i7h108a20@ds235775.mlab.com:35775/heroku_d0v3j3sw";
    var domain = "https://astrolabs-app.herokuapp.com";
} else {    
    var dburl = "mongodb://dbadmin1:r0SM+09h0p9E87K@localhost:27017/astrolabs";
    var domain ="http://localhost:3000";
}

// Code to connect to mongoDB.
mongoose.connect(dburl, {useMongoClient: true});
mongoose.connection.once('open', function(){
    console.log("DB is connected");
});

// The /lib is not an endpoint. It is folder that contains
// assets like icons, CSS, and front-end JavaScript.
// We tell express to use this a folder path — not another webpage. 
server.use('/lib', express.static(__dirname + '/lib'));

// To load templates into the browser, a view engine like ejs is required.
server.set('view engine', 'ejs');

// Set the port number to connect to. Use 3000 if it is available, 
// otherwise connect to whatever port the server will provide (Heroku, is the
// server in thise case). 
server.set('port', process.env.PORT || 3000);
server.listen(process.env.PORT || 3000, function(){
    console.log("Server is running!")
});


server.get('/home', function(req, res) {
    res.send("Homepage");
});


server.get('/about', function(req, res) {
    res.send("about us page");
    console.log(req);
});

server.get('/car', function(req, res) {
    res.send('car')
});

server.get('/car/:brand', function(req, res) {   
    res.render('page', {"pageName": req.params.brand});
});

server.get('/', function(req, res){
    res.render('app', {domain: domain})
});

server.get('/get-cards', function(req, res){
    cardsModel.find({}, function(err, result){
        if(err) res.send({error: err});
        res.send(result);
    });
});

server.post('/add-card', function(req, res){
    cardsModel.create({
        title: '',
        body: '',
        date: new Date().toLocaleDateString("en-US", {
            year: "numeric",
            month: "numeric",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            timeZone: "UTC",
            timeZoneName: "short",
            hour12: false
        })
    }, function(err, result){
        if(err) res.send({error: err});
        res.send(result);
    });
});

server.put('/change-card', function(req, res){
    cardsModel
    .findByIdAndUpdate({
        _id: req.body._id
    }, {$set: {
        title: req.body.title,
        body: req.body.body
    }}, (err, result)=>{
        if(err) res.send({err: err})
        res.send(result);
    })
});

server.delete('/delete-card', function(req, res){
    cardsModel
    .findByIdAndRemove({
        _id: req.body._id
    }, function(err, result) {
        if(err) res.send({error: err});
        res.send(result);
    })
});


//Catch all
server.get('/*', function(req, res) {
    res.send('404! The page does not exist');
});
