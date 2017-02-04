/**
 * Created by Administrator on 1/26/2017.
 */
 var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var bookSchema = new Schema({
    title:{type:String},
    author:{type:String},
    genre:{type:String},
    read:{
        type:Boolean,
        default:false
    }
});

var bookModel = mongoose.model('Book',bookSchema);

module.exports = bookModel;