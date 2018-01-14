var mongoose = require('mongoose');
var Post = mongoose.model('Post');

exports.getPosts = function(req, res) {
    // get all posts within the disply distance

    res.send({allposts: 'allposts'});
}

exports.createPost = function(req, res) {
    // store the new post to db

    var post = new Post(req.query);
    console.log(post);
    post.save().then(function(err) {
        if (err) throw err;
    });
    res.send(req.query);
}

exports.replyPost = function(req, res) {
    // reply to Post

    res.send('post created');
}