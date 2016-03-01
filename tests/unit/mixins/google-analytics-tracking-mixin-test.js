import Ember from 'ember';
import TrackingMixinMixin from '../../../mixins/tracking-mixin';
import { module, test } from 'qunit';

module('Unit | Mixin | tracking mixin');

// Replace this with your real tests.
test('it works', function(assert) {
  var TrackingMixinObject = Ember.Object.extend(TrackingMixinMixin);
  var subject = TrackingMixinObject.create();
  assert.ok(subject);
});
