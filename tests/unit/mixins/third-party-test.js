import Ember from 'ember';
import ThirdPartyMixin from '../../../mixins/third-party';
import { module, test } from 'qunit';

module('ThirdPartyMixin');

// Replace this with your real tests.
test('it works', function(assert) {
  var ThirdPartyObject = Ember.Object.extend(ThirdPartyMixin);
  var subject = ThirdPartyObject.create();
  assert.ok(subject);
});
