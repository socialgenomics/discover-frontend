import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('dataset-card', 'Integration | Component | dataset card', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });"

  this.render(hbs`{{dataset-card}}`);

  assert.ok(this.$()); // element is rendered

  // Template block usage:"
  // this.render(hbs`
  //   {{dataset-card}}
  // `);
});
