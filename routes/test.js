var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

const places = mongoose.model('Places');

router.get('/', async function(req, res, next) {
    const placesIds = await getPlacesId();
    const idsArray = [];

    for (const id of placesIds){
        idsArray.push(id.toString());
    }

    console.log(idsArray);

    return res.render('success', {title: idsArray});
});

function getPlacesId() {
    return places
        .distinct('_id')
}

module.exports = router;