import { moduleFor, test } from 'ember-qunit';
import startApp from '../../helpers/start-app';

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

// Replace this with your real tests.

test('it rejects empty input', function(assert){
  //expect this number of assertions
  assert.expect(2);
  var controller = this.subject();
  equal(controller.get('code'), null);
  //click('button.btn');
  //andThen(function(){
  equal(currentRouteName(),'verify', "Stayed on page");
  //})
});
