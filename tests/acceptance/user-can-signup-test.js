import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from 'repositive/tests/helpers/start-app';

module('Acceptance | user can signup', {
  beforeEach: function() {
    this.application = startApp();
  },

  afterEach: function() {
    Ember.run(this.application, 'destroy');
  }
});

test('user can signup and go to homepage', function(assert) {
  visit('/');
  fillIn('input[placeholder="Your activation code"]', 'QT7VwsqYbAI=');
  click('button:contains("Continue")');
  andThen(function() {
    assert.equal(currentURL(), '/users/signup');
  });

  fillIn('input[type=text]', 'Test Name');
  fillIn('input[type=email]', 'testemail@repositive.io');
  fillIn('input[type=password]', 'abcdefghi');
  click('button.full-width');
  andThen(function() {
    assert.equal(currentURL(), '/');
  });
});
