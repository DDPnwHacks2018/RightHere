var mongoose = require('mongoose');
var Post = mongoose.model('Post');
var User = mongoose.model('User');

exports.getPosts = function(req, res) {
    // get user
    var userName = "hls";
    User.findOne({name: userName}, function(err, user) {
        // get all posts within the disply distance
        Post.find(function(err, posts) {
            res.json({posts});
        });
    });
};

exports.createPost = function(req, res) {
    // store the new post to db
    var username = 'hls';
    User.findOne({name: username}, function(err, user) {
        var post = req.query;
        post.author = user;
        Post.create(post, function (err, new_post) {
            if (err) throw err;
            console.log('saved');

            // add post to user's own post
            // might be implemented??

            res.json({succ: true});
        });
    });
};

exports.replyPost = function(req, res) {
    // reply to Post

    res.send('post created');
};
