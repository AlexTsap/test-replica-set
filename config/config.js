const path = require('path');
const nconf = require('nconf');

module.exports = function(app) {
        const pathToConfig = path.resolve(__dirname, `./envs/env.json`);
        nconf
            .argv()
            .env()
            .file(pathToConfig);
        console.log(`Was loaded config: ${pathToConfig}`);

    app.set('nconf', nconf);
};