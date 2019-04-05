var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
const places = mongoose.model('Places');

const articles = mongoose.model('Articles');
const things = mongoose.model('Things');

router.get('/', async function(req, res, next) {
    const placesIds = await getPlacesId();
    console.log(placesIds);

    const result = await getArticleData(placesIds);

    return res.render('success', {title: result});
});

function getArticleData(thingsIds) {
    return articles
        .find({_id: thingsIds})
        .exec();
}

function getPlacesId() {
    return places
        .distinct('_id')
}

module.exports = router;