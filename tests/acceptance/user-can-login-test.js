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
  andThen(function() {
    fillIn('input[type="email"]', 'test1@repositive.io');
    fillIn('input[type="password"]', '12345678');
    click('button:contains("LOGIN")');
    andThen(function () {
      assert.equal(currentURL(), '/');
    });
  });
});
