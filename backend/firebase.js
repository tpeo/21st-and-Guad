const admin = require('firebase-admin');

const cred_JSON = JSON.parse(process.env.CRED_JSON)
admin.initializeApp({
    credential: admin.credential.cert(cred_JSON),
    databaseURL: 'https://st-and-guad.firebaseio.com'
});

const db = admin.firestore();
db.settings({ ignoreUndefinedProperties: true })
module.exports = { db, admin };