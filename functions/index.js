
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
