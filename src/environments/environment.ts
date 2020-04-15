// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyBqQXe1wdud3WtvMPicq5Csnej6wv9E0Hc",
    authDomain: "meals-plan.firebaseapp.com",
    databaseURL: "https://meals-plan.firebaseio.com",
    projectId: "meals-plan",
    storageBucket: "meals-plan.appspot.com",
    messagingSenderId: "359216860124",
    appId: "1:359216860124:web:a823a83335ce87b981dd19",
    measurementId: "G-ELLLFEDRW5"
  }
  
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
import * as firebase from 'firebase';
