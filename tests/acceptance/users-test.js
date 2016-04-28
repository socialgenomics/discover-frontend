import { module, test } from 'qunit';
import startApp from 'repositive/tests/helpers/start-app';

module('Acceptance | users', {
  beforeEach: function() {
    this.application = startApp();
  },

  afterEach: function() {
    Ember.run(this.application, 'destroy');
  }
});

test('I can view the users', function() {
  var users = server.createList('user', 3);

  visit('/users');

  andThen(function() {
    equal(find('li').length, 3);
    equal(find('li:first').text(), users[0].name);
  });
});
