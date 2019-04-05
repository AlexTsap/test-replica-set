const _ = require('lodash');

const places = [
    '547723a486deda0b00d4379c', '54773b8786deda0b00d43837', '54773e2f86deda0b00d438c3',
    '5477465186deda0b00d43a8e', '54785240be35740b009e81ae', '54787851be35740b009e8258',
    '547c4bc9b787bd0b00dcfb5b', '547c7e6dd5ddd70b00a0c661', '547c8567d5ddd70b00a0c6d1',
    '548efe940ad9d234652ac77b', '54af9f8d993307fb769cc481', '54afa49a0746a9cb7621e61e',
    '54afae37993307fb769cc52f', '54afd1eabe3215e776813dd3', '54afd58dbe3215e776813dec',
    '54afe0d1be3215e776813e3b', '54afe2b1993307fb769cc634', '54afe6bc80d862d9767cf2f5',
    '54afe95c80d862d9767cf32e', '54afec49993307fb769cc6fb', '54afedea993307fb769cc717',
    '54b39197b1c479446e1def85', '54b397ccb1c479446e1deff3', '54b398fca5a3d7566eb0030a',
    '54b39b6ea5a3d7566eb00326', '54b39cf19f0c8d666e1abef4', '54b3a02bb1c479446e1df064',
    '54b3a4edb1c479446e1df07d', '54b3a6c2a5a3d7566eb0038d', '54b3a95ea5a3d7566eb003aa',
    '54b3c4c0a5a3d7566eb003b6', '54b3c6c1a5a3d7566eb003d1', '54b3ca87b1c479446e1df0e1',
    '54b3cc3257de10366ed13507', '54b3cd6e9f0c8d666e1abfc1', '54b3cf0bb1c479446e1df120',
    '54b3cfbc57de10366ed13543', '54b3d11f57de10366ed13563', '54b3d468a5a3d7566eb00470',
    '54b3d68ea5a3d7566eb00483', '54b3daaf57de10366ed135ab', '54b3de069f0c8d666e1ac0d1',
    '54b3e24da5a3d7566eb00594', '54b4e3eaa5a3d7566eb006f0', '54b4e6e157de10366ed13811',
    '54b4eb529f0c8d666e1ac327', '54b4ef86a5a3d7566eb007e8', '54b4f3beb1c479446e1df536',
    '54b4f73c9f0c8d666e1ac45e', '54b51a173755cbfb542c2473', '54b51b835edc101155fa1ed2',
    '54b51c593755cbfb542c24a5', '54b520ed05df73e55431912b', '54b526423755cbfb542c24c9',
    '54b527fd5edc101155fa1f22', '54b529b405df73e55431917f', '54b535bc05df73e55431919f',
    '54b5388438ef07015525f229', '54b53af93755cbfb542c254e', '54b53c0138ef07015525f259',
    '54b53df43755cbfb542c2586', '54b53ebe5edc101155fa1fde', '54b53f6a05df73e55431922f',
    '54b5413d38ef07015525f2c5', '54b6414938ef07015525f2c6', '54b6431405df73e55431925d',
    '54b64c345edc101155fa20ef', '54b64f5105df73e55431939e', '54b65e235edc101155fa21b7',
    '54b664313755cbfb542c27f1', '54b66ff35edc101155fa229c', '54b683995edc101155fa22e1',
    '54b684615edc101155fa22ec', '54b6862f3755cbfb542c28cb', '54b686db05df73e554319553',
    '54b687863755cbfb542c28e8', '54b6883e38ef07015525f5e3', '54b6896d3755cbfb542c290d',
    '54b68b5d3755cbfb542c294a', '54b7b14fc53d4fa64fb8904f', '54b7b4b1c53d4fa64fb8909b',
    '54b7b6d5c302faad4f3aec44', '54b7b92fcb00419b4f4bfb48', '54b7bbadcb00419b4f4bfb9e',
    '54b7c01f25003a824f648898', '54b7c1d4c302faad4f3aed69', '54b7c6b4c53d4fa64fb89222',
    '54b7c9bfc302faad4f3aeda6', '54b7cc65c53d4fa64fb89259', '54b7ce63c302faad4f3aede0',
    '54b7d0c0c302faad4f3aedfb', '54b7d2b525003a824f64894c', '54b7d4b0c302faad4f3aee2b',
    '54b7d69625003a824f64897c', '54b7d79c25003a824f648996', '54b7d9c8cb00419b4f4bfd26',
    '54b7ddff25003a824f6489c7', '54b7dee3c53d4fa64fb89337', '54b7e2dec302faad4f3aef18',
    '54b7e39d25003a824f648a60'];

module.exports = {
    setupQuery,
    afterResponse
};

function setupQuery(context, events, next) {
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