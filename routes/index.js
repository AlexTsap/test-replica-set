var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

/* GET home page. */

router.get('/test', function(req, res, next) {
    return getArticleData((test) => {
        res.send(test);
        res.render('index', { title: 'Express' });
    });
});

const articles = mongoose.model('Articles');

async function getArticleData(cb) {
    return articles
        .findOne()
        .lean()
        .exec(cb);
}

module.exports = router;
