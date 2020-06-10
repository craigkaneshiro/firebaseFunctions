const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

// The Firebase Admin SDK to access Cloud Firestore.
const admin = require('firebase-admin');
admin.initializeApp();

// Firebase Database Trigger https://firebase.google.com/docs/functions/database-events
exports.addNewUser = functions.database.ref('/{lineItem}/{orderId}')
    .onCreate((snapshot, context) => {
      // Grab the current value of what was written to the Realtime Database.
      const addedRecord = snapshot.val();
      console.log('emailParam', context.params, addedRecord);
      
      // TODO: need to figure out values for context.params.lineItem so that only summer camp items are filtered
      

      return admin.auth().createUser({
        //TODO: uncomment this for prod email: addedRecord.email,
        email: 'craig.kaneshiro@gmail.com',
        emailVerified: false
      })
        .then(function(userRecord) {
          // See the UserRecord reference doc for the contents of userRecord.
          console.log('Successfully created new user:', userRecord.uid);
          return userRecord;
        })
        .catch(function(error) {
          console.log('Error creating new user:', error);
          return error;
        });
        // edge case - if email already exists, create user will fail


      // Modified from https://firebase.google.com/docs/auth/admin/import-users
      /*
      return admin.auth().importUsers([{
        email: addedRecord.email
      }])
        .then(function(results) {
          results.errors.forEach(function(indexedError) {
           console.log('Error importing user ' + indexedError.index);
           console.log(indexedError.error);
          });
          return results;
        })
        .catch(function(error) {
          console.log('Error importing users:', error);
          return error;
        });*/

      // You must return a Promise when performing asynchronous tasks inside a Functions such as
      // writing to the Firebase Realtime Database.
      // Setting an "uppercase" sibling in the Realtime Database returns a Promise.
      //return snapshot.ref.parent.child('uppercase').set(uppercase);
      //return new Promise();
    });

/*
exports.blockSignup = functions.auth.user().onCreate(event => {
    console.log("event", event);

    return admin.auth().updateUser(event.uid, { disabled: true })
        .then(userRecord => console.log("Auto blocked user", userRecord.toJSON()))
        .catch(error => console.log("Error auto blocking:", error));
});*/