var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var userSchema = new Schema({
    name: String,
    posts: [{type: ObjectId, ref: 'Post'}],
    loc: {loc_name: String, x: Number, y:Number}
});

mongoose.model('User', userSchema);