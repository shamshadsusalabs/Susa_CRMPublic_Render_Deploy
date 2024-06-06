const admin = require('firebase-admin');
const serviceAccount = require('./susacrm-7cb0a-firebase-adminsdk-hwxoo-dec02451b8.json'); 

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "susacrm-7cb0a.appspot.com" // e.g., project-id.appspot.com
});

module.exports = admin;
