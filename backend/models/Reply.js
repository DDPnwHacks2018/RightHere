var mongoose = require('mongoose');
var User = require('./User');
var Post = require('./Post');

var Schema = mongoose.Schema;

var replySchema = new Schema({ 
    text: String,
    author: User,
    post: Post,
    time: {type: Date, default: Date.now}
});

mongoose.model('Reply', replySchema);