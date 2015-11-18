/*jshint node:true*/
/* global require, module */
var EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  var app = new EmberApp(defaults, {
    // Add options here
  });

  // Use `app.import` to add additional libraries to the generated
  // output files.
  //
  // If you need to use different assets in different
  // environments, specify an object as the first parameter. That
  // object's keys should be the environment name and the values
  // should be the asset to use in that environment.
  //
  // If the library that you are including contains AMD or ES6
  // modules that you would like to import into your application
  // please specify an object with the list of modules as keys
  // along with the exports of each module as its value.

  app.import('bower_components/ember-localstorage-adapter/localstorage_adapter.js');
  app.import('bower_components/bootstrap/dist/js/bootstrap.js');
  app.import('bower_components/bootstrap/dist/css/bootstrap.css');
  app.import('bower_components/bootstrap/dist/css/bootstrap.css.map');

  // app.import('vendor/bootstrap.lumen.min.css');
  // app.import('bower_components/bootstrap/dist/css/bootstrap.css');
  // app.import('bower_components/bootstrap/dist/css/bootstrap.css.map');

  app.import('vendor/font-awesome-4.4.0/css/font-awesome.css');
  app.import('vendor/font-awesome-4.4.0/fonts/fontawesome-webfont.ttf', {destDir: 'font'});
  app.import('vendor/font-awesome-4.4.0/fonts/fontawesome-webfont.eot', {destDir: 'font'});
  app.import('vendor/font-awesome-4.4.0/fonts/fontawesome-webfont.svg', {destDir: 'font'});
  app.import('vendor/font-awesome-4.4.0/fonts/fontawesome-webfont.woff', {destDir: 'font'});

  return app.toTree();
};
