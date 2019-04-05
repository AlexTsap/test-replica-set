var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

const articles = mongoose.model('Articles');
const places = mongoose.model('Places');

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
        .find({_id: place._id}, {thing: 1})
        .exec();
}

function getPlacesId() {
    return places
        .find({}, {_id: 1})
        .exec()
}

module.exports = router;