var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

const articles = mongoose.model('Articles');

router.get('/', async function(req, res, next) {
    const result = await getArticleData();

    return res.render('success', {title: result.toJSON()});
});


async function getArticleData() {
    return await articles
        .find({}, {_id: 0, thing: 1})
        .limit(1)
        .exec();
}

module.exports = router;