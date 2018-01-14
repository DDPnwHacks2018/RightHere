var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var postSchema = new Schema({
    name: String,
    author: {type: ObjectId, ref: 'User'},
    text: String,
    replies: [{type: ObjectId, ref: 'Reply'}],
    images: [String],
    time: {type: Date, default: Date.now},
    loc: {loc_name: String, x: Number, y:Number}
});

mongoose.model('Post', postSchema);