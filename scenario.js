const _ = require('lodash');
const mongoose = require('mongoose');
const places = mongoose.model('Places');

function getPlacesId() {
    return places
        .distinct('_id')
}

module.exports = {
    setupQuery,
    afterResponse
};

async function setupQuery(context, events, next) {
    const places = await getPlacesId();
    context.vars['query'] = _.sampleSize(places, _.random(2, 6)).join(',');
    console.time(context.vars['query']);
    return next();
}

let i = 1;

function afterResponse(requestParams, response, context, ee, next) {
    console.log('#' + i, context.vars['query']);
    console.log('#' + i, requestParams.url);
    console.timeEnd(context.vars['query']);
    // console.log(_.toPairs(requestParams.url));
    if(response.error) {
        console.error('#' + i, response.error);
        return next();
    }

    console.log('#' + i, response.body);
    // const body = JSON.parse(response.body);
    // if (!body.success) {
    //   console.error('#' + i, body.error);
    // }
    i++;
    return next();
}