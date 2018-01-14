var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var userSchema = new Schema({
    name: {type: String, default: ""},
    posts: [{type: ObjectId, ref: 'Post'}],
    loc: {type: [Number], index: '2d'}
});

mongoose.model('User', userSchema);