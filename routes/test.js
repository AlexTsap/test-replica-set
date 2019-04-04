var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var articleSchema = require('../src/models/articles.js');

router.get('/', function(req, res, next) {
    return getArticleData((test) => {
        console.log(test);
        res.send('success', test);
    });
});

const articles = mongoose.model('Articles', articleSchema);

async function getArticleData(cb) {
    return articles
        .find()
        .lean()
        .exec(cb);
}

module.exports = router;