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
        Post.find(function(err, posts) {
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

            // send update 
            Post.find(function(err, posts) {
                if (err) return err;
                socketC.emit("do update", posts);
            });

            res.send(true);
        });
    });
};


exports.replyPost = function(req, res) {
    // reply to Post
    var username = "hls";
    var post_id = req.query.post_id;
    
    User.find({name: username}, function(err, user) {
        if (err) throw err;
        Post.find({_id: req.query.post_id}, function(err, post) {
            if (err) throw err;
            var reply = {
                text: req.query.text,
                author: user,
                post: post
            };

            console.log(reply);
            // insert to db
            Reply.create(reply, function(err, re) {
                if (err) throw err;
                
                // add to post replies
                if (post.replies == null)
                    post.replies = [re];
                else
                    post.replies.push(re);

                // save post
                post.save.then(function(err, updatedPost) {
                    if (err) throw err;

                    res.send(true);
                });
            });
        });
    });
};
function newFunction() {
    var imProcessor = require('./image');
}

