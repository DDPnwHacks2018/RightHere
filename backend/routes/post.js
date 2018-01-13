var express = require('express');
var router = express.Router();

/* GET home page. */
router.post('/createPost', function(req, res, next) {
    res.send('post created');
});

router.post('replyPost', function(req, res, next) {
    res.send('post replied');
});



module.exports = router;