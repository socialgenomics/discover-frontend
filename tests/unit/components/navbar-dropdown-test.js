import {
  moduleForComponent,
  test
} from 'ember-qunit';

moduleForComponent('navbar-dropdown', {
  // Specify the other units that are required for this test
  needs: ['service:metrics']
});

test('it renders', function(assert) {
  assert.expect(2);

  // Creates the component instance
  var component = this.subject();
  assert.equal(component._state, 'preRender');

  // Renders the component to the page
  this.render();
  assert.equal(component._state, 'inDOM');
});
