var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var replySchema = new Schema({ 
    text: String,
    author: {type: ObjectId, ref: 'User'},
    post_id: {type: ObjectId, ref: 'Post'},
    time: {type: Date, default: Date.now}
});

mongoose.model('Reply', replySchema);