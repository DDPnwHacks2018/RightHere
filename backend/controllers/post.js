var mongoose = require('mongoose');
var imProcessor = require('./image');
var Post = mongoose.model('Post');
var User = mongoose.model('User');
var Reply = mongoose.model('Reply');
var socketC = require('socket.io-client')('http://localhost:3000');

exports.getPosts = function(req, res) {
    // get user
    var userName = "hls";
    User.findOne({name: userName}, function(err, user) {
        // get all posts within the display distance
        Post.find()
            .populate('replies')
            .exec(function(err, posts) {
            res.json(posts);
        });
    });
};

exports.createPost = function(req, res) {
    // store the new post to db
    console.log(req.body);
    var username = 'hls';
    User.findOne({name: username}, function(err, user) {
        var post = req.query;
        post.author = user;
        Post.create(post, function (err, new_post) {
            if (err) throw err;
            console.log('saved');

            // add post to user's own post
            // might be implemented??

            // send update to socket
            socketC.emit("do_update_post", JSON.stringify(new_post));

            res.send(true);
        });
    });
};


exports.replyPost = function(req, res) {
    // reply to Post
    var username = "hls";
    var post_id = req.query.post_id;
    
    User.findOne({name: username}, function(err, user) {
        if (err) throw err;
        Post.findById(req.query.post_id, function(err, post) {
            if (err) throw err;
            var reply = {
                text: req.query.text,
                author: user,
                post: post
            };
            // insert to db
            Reply.create(reply, function(err, re) {
                if (err) throw err;
                post.update({ "$push": { "replies": re }}, function(err){
                    if (err) throw err;

                    socketC.emit("do_update_reply", JSON.stringify(re));
                    res.send(true);
                });
            });
        });
    });
};

