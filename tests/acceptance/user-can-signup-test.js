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
  visit('/verify');
  fillIn('input[placeholder="please enter your code"]', 'QT7VwsqYbAI=');
  click('button:contains("Continue")');
  andThen(function(){
    assert.equal(currentURL(), '/users/signup');
  });

  fillIn('input.signup-fullname', "Test Name" );
  fillIn('input.signup-email', "testemail@repositive.io");
  fillIn('input.signup-password', "abcdefghi");
  click('button.full-width');
  andThen(function() {
    assert.equal(currentURL(), '/');
  });
});
