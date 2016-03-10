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
    var random = (new Date%9e6).toString(36)
    assert.equal(currentURL(), '/users/signup', 'Current url is signup');
    fillIn('input[type="Text"]', 'Test Name');
    fillIn('input[type="Email"]', 'test'+random+'@repositive.io');
    fillIn('input[type="password"]', '12345678');
    assert.ok(click('button.full-width'), 'clicked "SIGN UP"');
    andThen(function() {
      assert.ok(click('button.btn-light'), 'clicked "VERIFY LATER"');
      assert.ok(find('#homepage'), 'got to the homepage');
      assert.equal(currentURL(), '/?code=QT7VwsqYbAI%3D', 'URL is /?code=QT7VwsqYbAI%3D');
    });
  });
});

test('existing user can not signup', function(assert) {
  visit('/');
  fillIn('input[placeholder="Your activation code"]', 'QT7VwsqYbAI=');
  click('button:contains("Continue")');
  andThen(function() {
    assert.equal(currentURL(), '/users/signup', 'Current url is signup');
    fillIn('input[type="Text"]', 'Test Name');
    fillIn('input[type="Email"]', 'test1@repositive.io');
    fillIn('input[type="password"]', '12345678');
    assert.ok(click('button.full-width'), 'clicked "SIGN UP"');
    andThen(function() {
      assert.ok(findWithAssert('.signup-email.invalid'), 'email already exists');
    });
  });
});
