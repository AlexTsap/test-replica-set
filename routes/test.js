var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

const articles = mongoose.model('Articles');

router.get('/', function(req, res, next) {
    return getArticleData((test) => {
        console.log(test);
        res.render('success', {title: test.toJSON()});
    });
});


async function getArticleData(cb) {
    return articles
        .find({}, {_id: 0, thing: 1})
        .limit(1)
        .exec(cb);
}

module.exports = router;