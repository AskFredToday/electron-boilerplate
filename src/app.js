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


/*    var googleTTS = require('google-tts-api');
 
googleTTS('Bonjour Noah, comment vas-tu?', 'fr', 1)   // speed normal = 1 (default), slow = 0.24 
.then(function (url) {
  console.log(url); // https://translate.google.com/translate_tts?... 
})
.catch(function (err) {
  console.error(err.stack);
});
*/

var say = require('say');
 
// Use default system voice and speed 
say.speak("Bonjour Frederic!");//" L'agenda est dégagé, il serait bien de travailler sur Saxophone aujourd'hui");



const Sonus = require('sonus')
const path = require('path')
const speech = require('@google-cloud/speech')({
  projectId: 'streaming-speech-sample',
  keyFilename: path.resolve('./google_speech_key.json')
})

const hotwords = [
  { file: path.resolve('node_modules/sonus/resources/snowboy.umdl'), hotword: 'snowboy' },
  { file: path.resolve('./app/resources/mute.pmdl'), hotword: 'mute' }
];
const language = "fr-FR"

//recordProgram can also be 'arecord' which works much better on the Pi and low power devices
const sonus = Sonus.init({ hotwords, language, recordProgram: "rec" }, speech)

Sonus.start(sonus)
console.log('Say "' + hotwords[0].hotword + '"...')

sonus.on('hotword', function(index, keyword) {
  console.log('!' + keyword);
  if(keyword == 'mute') {
    bus.trigger('togglemute');
  }
});
sonus.on('partial-result', result => console.log("Partial", result))

sonus.on('final-result', result => {
  console.log("Final", result)
  if (result.includes("stop")) {
    Sonus.stop()
  }
  if (result.includes("conférence")) {
    console.log("Dialing!");
    bus.trigger('dial', '+19178196323');
  }
});

});


