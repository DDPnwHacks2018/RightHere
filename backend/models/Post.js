var mongoose = require('mongoose');
var User = require('./User');
var Reply = require('./Reply')

var Schema = mongoose.Schema;

var postSchema = new Schema({
    name: String,
    author: User,
    text: String,
    replies: [Reply],
    images: [String],
    time: {type: Date, default: Date.now},
    loc: {loc_name: String, x: Number, y:Number}
});

mongoose.model('Post', postSchema);