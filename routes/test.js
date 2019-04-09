const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const async = require('async');

const places = mongoose.model('Places');
const infoPlaces = mongoose.model('InfoPlaces');

router.get('/', async function (req, res, next) {
    const placesIds = await getPlacesId();
    const info = await getInfoPlaceByPlacesIds(placesIds);
    if (!placesIds) {
        async.retry({
            times: 10,
            interval: function(retryCount) {
                return 50 * Math.pow(2, retryCount);
            }
        }, getPlacesId, async function(err, placesIds) {
            const info = await getInfoPlaceByPlacesIds(placesIds);

            if (!info) {
                async.retry({
                    times: 10,
                    interval: function(retryCount) {
                        return 50 * Math.pow(2, retryCount);
                    }
                }, getInfoPlaceByPlacesIds, async function(err, info) {
                    return res.send({success: true, body: info});
                });
            }
        });
    }

    return res.send({success: true, body: info});
});

function getPlacesId() {
    return places
        .distinct('_id')
}

function getInfoPlaceByPlacesIds(placesIds) {
    return infoPlaces
        .find(
            {place: {$in: placesIds}},
            {
                _id: 0,
                form: 1,
                place: 1,
                answer: 1,
                translations: {$elemMatch: {lang: 'en'}}
            }
        ).limit(100)
        .lean()
        .exec();
}

module.exports = router;