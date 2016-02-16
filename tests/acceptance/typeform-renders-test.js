import { test } from 'qunit';
import moduleForAcceptance from 'repositive/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | typeform renders');

test('visiting /beta-signup-form renders the typeform', function(assert) {
  visit('/beta-signup-form');

  andThen(function() {
    assert.equal(currentURL(), '/beta-signup-form');
    assert.ok(find('#typeform #loader').length, 'typeform should be present');
  });
});
