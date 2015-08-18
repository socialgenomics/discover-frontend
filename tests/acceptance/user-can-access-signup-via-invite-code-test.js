import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from 'repositive/tests/helpers/start-app';

module('Acceptance | user can access signup via invite code', {
  beforeEach: function() {
    this.application = startApp();
  },

  afterEach: function() {
    Ember.run(this.application, 'destroy');
  }
});

test('visiting /user-can-access-signup-via-invite-code', function(assert) {
  visit('/user-can-access-signup-via-invite-code');

  andThen(function() {
    assert.equal(currentURL(), '/user-can-access-signup-via-invite-code');
  });
});
