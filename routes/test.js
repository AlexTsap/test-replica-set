const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const async = require('async');

const places = mongoose.model('Places');
const infoPlaces = mongoose.model('InfoPlaces');

Function.prototype.createInterceptor = function createInterceptor(fn) {
    return async function () {
        const result = fn();

        if (result) {
            return result;
        } else {
            async.retry({
                times: 3,
                interval: await wait(1000)
            }, await fn, function (err, result) {
                try {
                    return result;
                } catch (e) {
                    throw new Error(`Error: ${e}`);
                }
            })
        }
    };
};

async function wait(ms) {
    return new Promise(resolve => {
        setTimeout(resolve, ms);
    });
}

async function getFinalResult() {
    const placeIds = await getPlacesId();

    if (!placeIds) {
        throw new Error('Ids were not found');
    }

    const infoResult = await getInfoPlaceByPlacesIds(placeIds);

    if (!infoResult) {
        throw new Error('Results were not found');
    }

    return infoResult;
}

router.get('/', async (req, res, next) => {
    try {
        const info = getFinalResult.createInterceptor(getFinalResult);
        console.log(info);
        return res.send({success: true, body: info});
    } catch (e) {
        return next(e);
    }
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

function interceptorDb() {

}

module.exports = router;