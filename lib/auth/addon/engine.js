import Engine from 'ember-engines/engine';
import loadInitializers from 'ember-load-initializers';
import Resolver from './resolver';
import config from './config/environment';

const { modulePrefix } = config;

const Eng = Engine.extend({
  modulePrefix,
  Resolver,

  dependencies: {
    services: [
      'session',
      'metrics',
      'ajax',
      'flashMessages'
    ],
    externalRoutes: [
      'policies',
      'root'
    ]
  }
});

loadInitializers(Eng, modulePrefix);

export default Eng;
