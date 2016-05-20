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

/*
we don't have input any more
test('bad invite code shows error message', function(assert) {
  visit('/');
  fillIn('input[placeholder="Your activation code"]', 'rubbish');
  click('button:contains("Continue")');
  andThen(()=> {
    assert.equal(currentURL(), '/?code=rubbish', 'route does not change');
    //assert.equal(find('.error-text')[0].innerText,'This invite code is invalid.', "error message shows");
  });
});*/
