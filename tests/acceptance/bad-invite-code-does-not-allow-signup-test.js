import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from 'repositive/tests/helpers/start-app';

module('Acceptance | user cannot access signup via bad invite code', {
  beforeEach: function() {
    this.application = startApp();
  },

  afterEach: function() {
    Ember.run(this.application, 'destroy');
  }
});

test('bad invite code shows error message', function(assert) {
  visit('/verify');
  fillIn('input[placeholder="please enter your code"]', 'rubbish');
  click('button:contains("Continue")');
  andThen(()=>{
    assert.equal(currentURL(), '/verify?code=rubbish', "route does not change");
    //assert.equal(find('.error-text')[0].innerText,'This invite code is invalid.', "error message shows");
  });
});
