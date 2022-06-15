const firebase = require("firebase-admin");

firebase.initializeApp();

const firestore = firebase.firestore();

module.exports = {firestore};
