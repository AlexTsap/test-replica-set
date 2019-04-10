const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
// const async = require('async');

const places = mongoose.model('Places');
const infoPlaces = mongoose.model('InfoPlaces');

// const asyncMiddleware = fn =>
//     (req, res, next) => {
//         Promise.resolve(fn(req, res, next))
//             .catch(next);
//     };
//
// router.get('/', asyncMiddleware(async function (req, res, next) {
//     try {
//         const placesIds = await getPlacesId();
//         const info = await getInfoPlaceByPlacesIds(placesIds);
//
//         return res.send({success: true, body: info});
//     } catch (e) {
//         return res.send({success: false, body: e});
//     }
// }));

router.get('/', async (req, res, next) => {
    let counter = 3;
    let placesIds;
    let info;
    let error = true;

    while (counter && error) {
        try {
            error = false;
            placesIds = await getPlacesId();
            info = await getInfoPlaceByPlacesIds(placesIds);
            console.log(info);
        } catch (e) {
            counter--;
            error = e;
        }
    }

    if (info) {
        return res.send({success: true, body: info});
    }

    return next(error);
});

async function getPlacesId() {
    console.log('places');
    return places
        .distinct('_id')
}

async function getInfoPlaceByPlacesIds(placesIds) {
    console.log('test');
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
        ).limit(10)
        .lean()
        .exec();
}

module.exports = router;