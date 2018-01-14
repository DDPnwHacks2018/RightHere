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
        Post.find({}, '_id time text')
            .populate('replies', '_id post_id time text')
            .exec(function(err, posts) {
            if (err) return res.send(false);
            
            // retrive image
            /*
            posts.forEach(function(post) {
                post.images = imProcessor.getImages(post.images);
            });
            */
            res.json(posts);
        });
    });
};

exports.createPost = function(req, res) {
    // store the new post to db
    var username = 'hls';
    User.findOne({name: username}, function(err, user) {
        var post = req.body;
        post.author = user;
        // store and compute image hash
        console.log(post);
        if (post.images) {
            post.images = imProcessor.uploadImages(post.images);
        }
        Post.create(post, function (err, new_post) {
            if (err) return res.send(false);
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
    var post_id = req.body.post_id;
    
    User.findOne({name: username}, function(err, user) {
        if (err) return res.send(false);
        Post.findById(req.body.post_id, function(err, post) {
            if (err) return res.send(false);
            var reply = {
                text: req.body.text,
                author: user,
                post_id: post
            };
            // insert to db
            Reply.create(reply, function(err, re) {
                if (err) return res.send(false);
                post.update({ "$push": { "replies": re }}, function(err){
                    if (err) return res.send(false);

                    socketC.emit("do_update_reply", JSON.stringify(re));
                    res.send(true);
                });
            });
        });
    });
};

