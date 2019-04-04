const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

router.get('/test', (req, res, next) => {
    return getArticleData((test) => {
        res.send(test);
    });
});

const articles = mongoose.model('Articles');

async function getArticleData(cb) {
    return articles
        .findOne()
        .lean()
        .exec(cb);
}