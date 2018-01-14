var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var objectId = Schema.objectId;

var postSchema = new Schema({
    name: String,
    author: String,
    body: String,
    comments: [{author: String, body: String, date: Date}],
    date: {type: Date, default: Date.now},
    loc: {loc_name: String, x: Number, y:Number}
});

console.log('shit');
mongoose.model('Post', postSchema);