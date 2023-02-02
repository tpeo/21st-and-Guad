const admin = require('firebase-admin');

//for some reason .env doesn't work, using cred.json for now
admin.initializeApp({
    credential: admin.credential.cert(require('./cred.json')),
    databaseURL: 'https://st-and-guad.firebaseio.com'
});

const db = admin.firestore();
module.exports = { db, admin };