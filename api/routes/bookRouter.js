/**
 * Created by Administrator on 1/26/2017.
 */

var express = require('express');

var routes = function(){
    var Book = require('../models/bookModel');
    var bookRouter = express.Router();

        bookRouter.route('/books')
        .get(function(req, res){
                var query = {};
                if(req.query.genre){
                    query.genre = req.query.genre;
                }
                Book.find(query,function(err, book){
                    if(err){
                        req.status(500).send('Cannot get books');
                    }
                    res.json(book);
                });

        })
        .post(function(req, res){

                var book = new Book(req.body);
                book.save();
                res.send(book);

            });

        bookRouter.route('/books/:bookId')
            .get(function(req, res){
                Book.findById(req.params.bookId,function(err, book){
                    if(err){
                        res.status(500).send('Cant get single book');
                    }
                    res.json(book);
                })
            });


    return bookRouter;

};

module.exports = routes;