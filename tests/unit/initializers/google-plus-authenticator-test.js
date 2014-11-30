import Ember from 'ember';
import { initialize } from 'repositive.io/initializers/google-plus-authenticator';

var container, application;

module('GooglePlusAuthenticatorInitializer', {
  setup: function() {
    Ember.run(function() {
      container = new Ember.Container();
      application = Ember.Application.create();
      application.deferReadiness();
    });
  }
});

// Replace this with your real tests.
test('it works', function() {
  initialize(container, application);

  // you would normally confirm the results of the initializer here
  ok(true);
});

