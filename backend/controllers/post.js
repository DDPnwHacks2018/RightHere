var mongoose = require('mongoose');
var Post = mongoose.model('Post');
var User = mongoose.model('User');

exports.getPosts = function(req, res) {
    // get all posts within the disply distance

    var userName = "hls";
    User.findOne({name: userName}, function(err, user) {
        console.log(user);
    });
    

    res.send({allposts: 'allposts'});
};

exports.createPost = function(req, res) {
    // get user
    var userName = "hls";
    User.findOne({name: userName}, function(err, user) {
        // store the new post to db
        console.log('found one');
        var post = new Post(req.query);
        post.save().then(function(err) {
            if (err) return err;
            console.log('saved');

            res.json({succ: true});
        });
    });

    /*
    Post.create(req.query, function(err, post) {
        if (err) throw err;
        console.log('saved');

        // notify users nearby

        res.json({succ: true});
    });
    */
    /*
    var post = new Post(req.query);
    post.save().then(function(err) {
        if (err) throw err;
        console.log('saved');        
    });
    */
};

exports.replyPost = function(req, res) {
    // reply to Post
    res.send('post created');
};
