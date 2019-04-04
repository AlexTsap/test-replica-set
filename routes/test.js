var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var articleSchema = require('../src/models/articles.js');

router.get('/', function(req, res, next) {
    return getArticleData((test) => {
        console.log(test);
        res.render('success', {title: test});
    });
});

const articles = mongoose.model('Articles');

async function getArticleData(cb) {
    return articles
        .find()
        .lean()
        .exec(cb);
}

module.exports = router;