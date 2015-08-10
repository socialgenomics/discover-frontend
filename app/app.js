import Ember from 'ember';
import Resolver from 'ember/resolver';
import loadInitializers from 'ember/load-initializers';
import config from './config/environment';

Ember.MODEL_FACTORY_INJECTIONS = true;

var App = Ember.Application.extend({
  modulePrefix: config.modulePrefix,
  podModulePrefix: config.podModulePrefix,
  Resolver: Resolver,
  sassOptions: {
    inputFile:'main.scss',
    outputFile:'main.css',
    includePaths: [
      //'bower_components/bootstrap-sass/assets/stylesheets'
    ]
  },
});

loadInitializers(App, config.modulePrefix);

export default App;
