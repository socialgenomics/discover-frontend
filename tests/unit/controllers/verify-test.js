import { moduleFor, test } from 'ember-qunit';
import startApp from '../../helpers/start-app';
import Ember from 'ember';

var App;

moduleFor('controller:verify', 'Verify Controller', {
  // Specify the other units that are required for this test.
  needs: ['controller:application'],

  setup: function () {
    App = startApp();
  },

  teardown: function () {
    Ember.run(App, App.destroy);
  }
});

test('it exists', function(assert) {
  var controller = this.subject();
  assert.ok(controller);
});
