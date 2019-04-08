const mongoose = require('mongoose');

let firstConnect = false;

module.exports = async function(app) {
    const nconf = app.get('nconf');
    const mongoUri = 'mongodb://root:NyRBxnVk44yt@35.204.110.131:27017,35.204.128.188:27017,35.204.176.177:27017/?replicaSet&authSource=dollarstreet';
    const db = mongoose.connection;

    const dbconnection = function() {
        mongoose
            .connect(mongoUri, {
                useNewUrlParser: true,
                connectTimeoutMS: 5000,
                reconnectInterval: 5000,
                autoReconnect: true
            })
            .then((_db) => {
                if (_db.connection._readyState && !firstConnect) {
                    firstConnect = true;
                    dbconnection();

                    return;
                }

                if (!_db.connection._readyState) {
                    dbconnection();
                }
            })
            .catch((error) => {
                console.error(new Date(), String(error));
            });
    };

    /*eslint-disable*/
    db.once('connecting', () => console.log('db connecting...', mongoUri));
    db.once('connected', () => console.log('db connect good: ', mongoUri));
    db.once('reconnected', () => console.log('db reconnected...', mongoUri));
    db.once('close', () => console.log('db connect close', mongoUri));
    db.on('error', function(error) {
        // If first connect fails because server-database is'nt up yet, try again.
        // This is only needed for first connect, not for runtime reconnects.
        // See: https://github.com/Automattic/mongoose/issues/5169
        console.error(error);
        if (error.message && error.message.match(/failed to connect to server .* on first connect/)) {
            setTimeout(function() {
                dbconnection();
            }, 5000);
        } else {
            // Some other error occurred.  Log it.
            console.error(new Date(), String(error));
        }
    });
    /*eslint-enable*/

    dbconnection();
};