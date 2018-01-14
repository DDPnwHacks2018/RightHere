var mongoose = require('mongoose');
var Post = require('./Post');

var Schema = mongoose.Schema;
var objectId = Schema.objectId;
//var Post = mongoose.model('Post');

var userSchema = new Schema({
    name: String,
    posts: [Post],
    loc: {loc_name: String, x: Number, y:Number}
});


mongoose.model('User', userSchema);