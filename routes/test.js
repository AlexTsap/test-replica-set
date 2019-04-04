var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var articleSchema = require('../src/models/articles.js');

router.get('/', function(req, res, next) {
    return getArticleData((test) => {
        console.log(test);
        res.render('success', {title: test.toJSON()});
    });
});

const articles = mongoose.model('Articles');

async function getArticleData(cb) {
    return articles
        .find()
        .exec(cb);
}

module.exports = router;