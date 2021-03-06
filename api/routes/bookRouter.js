/**
 * Created by Administrator on 1/26/2017.
 */

var express = require('express');

var routes = function(){
    var Book = require('../models/bookModel');
    var bookController = require('../controllers/bookController')(Book);

    var bookRouter = express.Router();

        bookRouter.route('/')
        .get(bookController.get)
        .post(bookController.post);

        bookRouter.use('/:bookId', function(req, res, next){
            Book.findById(req.params.bookId, function(err, book){
                if(err){
                    res.status(404).send("err finding by Id: ");
                }
                else if(book){
                 req.book = book;
                    next();
                }
                else{
                    req.status(404).send("No book found");
                }
            })
        });
        bookRouter.route('/:bookId')
            .get(function(req, res){
                res.json(req.book);
            })
            .put(function(req, res){
                    req.book.title = req.body.title;
                    req.book.genre = req.body.genre;
                    req.book.read = req.body.read;
                    req.book.author = req.body.author;
                    req.book.save(function(err){
                        if(err){
                            res.status(500).send(err);
                        }
                        else{
                            res.json(req.book);
                        }
                    });

            })
            .patch(function(req, res){
                if(req.body._id){
                    delete req.body._id;
                }

                for(var p in req.body){
                    req.book[p] = req.body[p];
                }

                req.book.save(function(err){
                    if(err){
                        res.status(500).send(err);
                    }
                    else{
                        res.json(req.book);
                    }
                })

            })
            .delete(function(req, res){
                req.book.remove(function(err){
                    if(err){
                        res.status(500).send(err);
                    }
                    else{
                        res.status(204).send("Book Removed");
                    }
                });
            });


    return bookRouter;

};

module.exports = routes;