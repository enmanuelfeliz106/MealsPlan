
  cordova.define('cordova/plugin_list', function(require, exports, module) {
    module.exports = [
      {
          "id": "cordova-plugin-calendar.Calendar",
          "file": "plugins/cordova-plugin-calendar/www/Calendar.js",
          "pluginId": "cordova-plugin-calendar",
        "clobbers": [
          "Calendar"
        ]
        },
      {
          "id": "cordova-plugin-device.device",
          "file": "plugins/cordova-plugin-device/www/device.js",
          "pluginId": "cordova-plugin-device",
        "clobbers": [
          "device"
        ]
        },
      {
          "id": "cordova-plugin-firebase.FirebasePlugin",
          "file": "plugins/cordova-plugin-firebase/www/firebase.js",
          "pluginId": "cordova-plugin-firebase",
        "clobbers": [
          "FirebasePlugin"
        ]
        },
      {
          "id": "cordova-plugin-statusbar.statusbar",
          "file": "plugins/cordova-plugin-statusbar/www/statusbar.js",
          "pluginId": "cordova-plugin-statusbar",
        "clobbers": [
          "window.StatusBar"
        ]
        },
      {
          "id": "cordova-plugin-firebase-authentication.FirebaseAuthentication",
          "file": "plugins/cordova-plugin-firebase-authentication/www/FirebaseAuthentication.js",
          "pluginId": "cordova-plugin-firebase-authentication",
        "merges": [
          "cordova.plugins.firebase.auth"
        ]
        }
    ];
    module.exports.metadata =
    // TOP OF METADATA
    {
      "cordova-plugin-calendar": "5.1.5",
      "cordova-plugin-firebase": "2.0.5",
      "cordova-plugin-firebase-authentication": "3.2.0",
      "cordova-support-android-plugin": "1.0.2",
      "cordova-support-google-services": "1.4.0",
      "cordova-plugin-device": "2.0.2",
      "cordova-plugin-statusbar": "2.4.2",
      "cordova-plugin-whitelist": "1.3.3"
    };
    // BOTTOM OF METADATA
    });
    