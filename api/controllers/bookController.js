/**
 * Created by Administrator on 2/3/2017.
 */

var bookController = function(Book){

    var getData = function(req, res){

        var query = {};
        if(req.query.genre){
            query.genre = req.query.genre;
        }
        console.log(req.query)
        Book.find(query, function(err, book){
            if(err){
                res.status(500).send(err);
            }
            res.json(book);
        })
    };

    var postData = function(req, res){

        var newBook = new Book(req.body);
        newBook.save();
        if(!req.body.title){
            res.status(400);
            res.send("Title is required");
        }
        else{
            res.status(201);
            res.send(newBook);
        }
    };

    return {
        get:getData,
        post:postData
    }

};

module.exports = bookController;