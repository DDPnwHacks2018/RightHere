var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var objectId = Schema.objectId;

var userSchema = new Schema({
    name: String,
    author: String,
    body: String,
    comments: [{author: String, body: String, date: Date}],
    date: {type: Date, default: Date.now},
    loc: {loc_name: String, x: Number, y:Number}
});


mongoose.model('User', userSchema);