import { moduleFor, test } from 'ember-qunit';

moduleFor('route:datasets/register', 'Unit | Route | datasets/register', {
  // Specify the other units that are required for this test.
  needs: [
    'service:metrics',
    'service:session'
  ]
});

test('it exists', function(assert) {
  let route = this.subject();
  assert.ok(route);
});
