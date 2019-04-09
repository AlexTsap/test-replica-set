const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const retry = require('async-retry');
const fetch = require('node-fetch');

const places = mongoose.model('Places');
const infoPlaces = mongoose.model('InfoPlaces');

router.get('/', async function (req, res, next) {
    const placesIds = await getPlacesId();
    const info = await getInfoPlaceByPlacesIds(placesIds);
    if (res.statusCode !== 200) {
        await retry(async bail => {
            // if anything throws, we retry
            const res = await fetch('http://35.205.193.69:3000/test');

            if (403 === res.status) {
                // don't retry upon 403
                bail(new Error('Unauthorized'));
                return
            }

            const data = await res.text();
            return data.substr(0, 500)
        }, {
            retries: 5
        })
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