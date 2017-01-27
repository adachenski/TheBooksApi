/**
 * Created by Administrator on 1/25/2017.
 */
var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser');

var db = mongoose.connect('mongodb://localhost/bookApi');

var Book = require('./models/bookModel');

var app = express();

var port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var bookRouter = require('./routes/bookRouter.js')();


app.use('/api', bookRouter);

app.get('/', function (req, res) {
    res.send("Nasko");
});

app.listen(port, function () {
    console.log('Server is running on port: ' + port);
});