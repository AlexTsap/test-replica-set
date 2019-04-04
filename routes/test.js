var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var articleSchema = require('../src/models/articles.js');

router.get('/', function(req, res, next) {
    return getArticleData((test) => {
        res.send(test);
    });
});

const articles = mongoose.model('Articles', articleSchema);

async function getArticleData(cb) {
    return articles
        .findOne()
        .lean()
        .exec(cb);
}

module.exports = router;