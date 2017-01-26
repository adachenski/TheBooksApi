/**
 * Created by Administrator on 1/25/2017.
 */
var express = require('express'),
    mongoose = require('mongoose');

var db = mongoose.connect('mongodb://localhost/bookApi');

var Book = require('./models/bookModel');

var app = express();

var port = process.env.PORT || 3000;

var bookRouter = express.Router();

bookRouter.route("/books")
    .get(function(req, res){
    Book.find(function(err, books){
        if(err){
            res.status(500).send('Err getting books from mongoose');
        }
        res.json(books);
    })
});

app.use('/api',bookRouter);

app.get('/',function(req, res){
    res.send("Nasko");
});

app.listen(port,function(){
    console.log('Server is running on port: '+port);
});