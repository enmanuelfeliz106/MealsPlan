
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

/**
 * Copyright 2017 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const admin = require('firebase-admin');
const functions = require('firebase-functions');
const firebase_tools = require('firebase-tools');
// Paths for clearing and exporting data.
// All instances of `UID` in the JSON are replaced by the user's uid at runtime.
const userPrivacyPaths = require('./user_privacy.json');

admin.initializeApp(functions.config().firebase);

const firestore = admin.firestore();
const FieldValue = admin.firestore.FieldValue;

// App-specific default bucket for storage. Used to upload exported json and in
// sample json of clearData and exportData paths.

// The clearData function removes personal data from the RealTime Database,
// Storage, and Firestore. It waits for all deletions to complete, and then
// returns a success message.
//
// Triggered by a user deleting their account.
exports.clearData = functions.auth.user().onDelete(async (event) => {
  const uid = event.uid; 

  const firestorePromise = clearFirestoreData(uid);

  await Promise.all([firestorePromise]);
  return console.log(`Successfully removed data for user #${uid}.`);
});

// Clear all specified paths from the Firestore Database. To add or remove a
// path, edit the `firestore[clearData]` array in `user_privacy.json`.
//
// This function is called by the top-level `clearData` function.
//
// Returns a list of Promises
const clearFirestoreData = async (uid) => {
  const paths = userPrivacyPaths.firestore.clearData;
  const promises = [];

  for (let i = 0; i < paths.length; i++) {
    const entry = paths[i];
    const entryCollection = replaceUID(entry.collection, uid);
    const entryDoc = replaceUID(entry.doc, uid);
    const docToDelete = firestore.collection(entryCollection).doc(entryDoc);
    if ('field' in entry) {
      const entryField = replaceUID(entry.field, uid);
      const update = {};
      update[entryField] = FieldValue.delete();
      promises.push(docToDelete.update(update).catch((err) => {
        console.error('Error deleting field: ', err);
      }));
    } else if (docToDelete) {
      promises.push(docToDelete.delete().catch((err) => {
        console.error('Error deleting document: ', err);
      }));
    }
  }

  await Promise.all(promises);
  return uid;
};

const replaceUID = (str, uid) => {
    return str.replace(/UID_VARIABLE/g, uid);
  };

  exports.mintAdminToken = functions.https.onCall((data, context) => {
    const uid = data.uid;
  
    return admin
      .auth()
      .createCustomToken(uid, { admin: true })
      .then(function(token) {
        return { token: token };
      });
  });
  
  // [START recursive_delete_function]
  /**
   * Initiate a recursive delete of documents at a given path.
   * 
   * The calling user must be authenticated and have the custom "admin" attribute
   * set to true on the auth token.
   * 
   * This delete is NOT an atomic operation and it's possible
   * that it may fail after only deleting some documents.
   * 
   * @param {string} data.path the document or collection path to delete.
   */
  exports.recursiveDelete = functions
    .runWith({
      timeoutSeconds: 540,
      memory: '2GB'
    })
    .https.onCall((data, context) => {
      // Only allow admin users to execute this function.
      if (!(context.auth && context.auth.token && context.auth.token.admin)) {
        throw new functions.https.HttpsError(
          'permission-denied',
          'Must be an administrative user to initiate delete.'
        );
      }
  
      const path = data.path;
      console.log(
        `User ${context.auth.uid} has requested to delete path ${path}`
      );
  
      // Run a recursive delete on the given document or collection path.
      // The 'token' must be set in the functions config, and can be generated
      // at the command line by running 'firebase login:ci'.
      return firebase_tools.firestore
        .delete(path, {
          project: process.env.GCLOUD_PROJECT,
          recursive: true,
          yes: true,
          token: functions.config().fb.token
        })
        .then(() => {
          return {
            path: path 
          };
        });
    });
    // [END recursive_delete_function]


