var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

const places = mongoose.model('Places');
const infoPlaces = mongoose.model('InfoPlaces');

router.get('/', async function(req, res, next) {
    const placesIds = await getPlacesId();
    const info = await getInfoPlaceByPlacesIds(placesIds);
    console.log(info);
    return res.render('success', {title: info.});
});

function getPlacesId() {
    return places
        .distinct('_id')
}

function getInfoPlaceByPlacesIds(placesIds){
    return infoPlaces
        .find(
            {place: { $in: placesIds }},
            {
                _id: 0,
                form: 1,
                place: 1,
                answer: 1,
                translations: { $elemMatch: { lang: 'en' } }
            }
        )
        .lean()
        .exec();
}

module.exports = router;