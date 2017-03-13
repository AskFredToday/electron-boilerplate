// Here is the starting point for your application code.
// All stuff below is just to show you how it works. You can delete all of it.

// Use new ES6 modules syntax for everything.
import os from 'os'; // native node.js module
import { remote } from 'electron'; // native electron module
import jetpack from 'fs-jetpack'; // module loaded from npm
import { greet } from './hello_world/hello_world'; // code authored by you in this project
import env from './env';
import { Models, Detector } from "snowboy";
import record from 'node-record-lpcm16';

console.log('Loaded environment variables:', env);

var app = remote.app;
var appDir = jetpack.cwd(app.getAppPath());
console.log(appDir);

// Holy crap! This is browser window with HTML and stuff, but I can read
// here files like it is node.js! Welcome to Electron world :)
console.log('The author of this app is:', appDir.read('package.json', 'json').author);

document.addEventListener('DOMContentLoaded', function() {
    var bus = riot.observable();
    riot.mount('#jssip', 'af-jssip', {'bus': bus, 'wsurl' : 'wss://saxophone.dev-mastmobile.com:443', 'uri' : 'sip:operator@be01d01396.sip.staging-gridmobile.com', 'password' : 'ce4bb8b13f9299b4', 'number' : '+19178196323'});

/*    const models = new Models();

    models.add({
      file: 'app/resources/snowboy.umdl',
      sensitivity: '0.5',
      hotwords : 'snowboy'
    });

    const detector = new Detector({
      resource: "app/resources/common.res",
      models: models,
      audioGain: 2.0
    });

    detector.on('silence', function () {
      console.log('silence');
    });

    detector.on('sound', function () {
      console.log('sound');
    });

    detector.on('error', function () {
      console.log('error');
    });

    detector.on('hotword', function (index, hotword) {
      console.log('hotword', index, hotword);
    });

    const mic = record.start({
      threshold: 0,
      verbose: true
    });

    mic.pipe(detector);*/


});
