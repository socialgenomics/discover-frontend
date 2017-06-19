import Ember from 'ember';
import Resolver from './resolver';
import loadInitializers from 'ember-load-initializers';
import config from './config/environment';

let App;

Ember.MODEL_FACTORY_INJECTIONS = true;

App = Ember.Application.extend({
  modulePrefix: config.modulePrefix,
  podModulePrefix: config.podModulePrefix,
  Resolver,

  engines: {
    auth: {
      dependencies: {
        services: [
          'session',
          'metrics',
          'ajax',
          'flashMessages'
        ],
        externalRoutes: {
          policies: 'policies',
          root: 'root'
        }
      }
    }
  }
});

loadInitializers(App, config.modulePrefix);

export default App;
