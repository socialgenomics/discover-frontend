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

test('correct code takes user to signup page', function(assert) {
  visit('/verify').then(()=>{
    fillIn('input[placeholder="please enter your code"]', 'QT7VwsqYbAI=').then(()=>{
      click('button:contains("Continue")').then(()=>{
        assert.equal(currentURL(), '/users/signup');
      });
    });
  });
});
