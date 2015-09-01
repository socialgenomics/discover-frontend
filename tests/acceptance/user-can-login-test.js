import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from 'repositive/tests/helpers/start-app';

module('Acceptance | user can login', {
  beforeEach: function() {
    this.application = startApp();
  },

  afterEach: function() {
    Ember.run(this.application, 'destroy');
  }
});

test('user can login and go to homepage', function(assert) {
  visit('/users/login');
  fillIn('input.login-email', "testaccount@repositive.io");
  fillIn('input.login-password', "abcdefghi");
  click('button.full-width');
  andThen(function() {
    assert.equal(currentURL(), '/');
  });
});
