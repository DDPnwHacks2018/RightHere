var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var userSchema = new Schema({
    name: String,
    posts: [{type: ObjectId, ref: 'Post'}],
    loc: {type: [Number], index: '2d'},
    socket_id: String
});

mongoose.model('User', userSchema);