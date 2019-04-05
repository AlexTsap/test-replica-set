var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
const places = mongoose.model('Places');

const articles = mongoose.model('Articles');
const things = mongoose.model('Things');

router.get('/', async function(req, res, next) {
    const placesIds = await getPlacesId();
    const thingArr = [];
    for (const place of placesIds) {
        const result = await getArticleData(place);
        console.log(result);

        thingArr.push(result);
    }

    return res.render('success', {title: thingArr});
});

function getArticleData(place) {
    return articles
        .find({_id: place}, {thing: 1})
        .exec();
}

function getPlacesId() {
    return places
        .distinct('_id')
}

module.exports = router;