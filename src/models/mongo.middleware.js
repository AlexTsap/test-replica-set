import * as express from 'express';
import * as path from 'path';
import * as fs from 'fs';

module.exports = (app) => {
    const nconf = app.get('nconf');
    const compression = app.get('compression.middleware');
    const baseHref = nconf.get('BASE_HREF');
    const CMS_EXTERNAL_PORT = nconf.get('CMS_EXTERNAL_PORT');

    app.set('mongo.middleware', (req, res, next) => {
        console.log(res);

        return next();
    });
};