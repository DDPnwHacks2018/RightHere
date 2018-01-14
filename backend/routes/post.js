var express = require('express');
var router = express.Router();
var postController = require('../controllers/post.js');

router.post('/', postController.getPosts);

// these two should be get but tested with get
router.post('/reply', postController.replyPost);
router.post('/create', postController.createPost);

module.exports = router;