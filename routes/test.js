var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

const places = mongoose.model('Places');

router.get('/', async function(req, res, next) {
    const placesIds = await getPlacesId();

    return res.render('success', {title: placesIds});
});

function getPlacesId() {
    return places
        .find({}, {_id: 1})
        .exec()
}

module.exports = router;