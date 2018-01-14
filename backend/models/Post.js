var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var postSchema = new Schema({
    name: {type: String, default: ""},
    author: {type: ObjectId, ref: 'User'},
    text: {type: String, default: ""},
    replies: [{type: ObjectId, ref: 'Reply'}],
    images: [String],
    time: {type: Date, default: Date.now},
    loc: {type: [Number], index: '2d'}
});

mongoose.model('Post', postSchema);