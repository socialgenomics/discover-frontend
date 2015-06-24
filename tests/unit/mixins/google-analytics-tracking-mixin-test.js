import Ember from 'ember';
import GoogleAnalyticsTrackingMixinMixin from '../../../mixins/google-analytics-tracking-mixin';
import { module, test } from 'qunit';

module('Unit | Mixin | google analytics tracking mixin');

// Replace this with your real tests.
test('it works', function(assert) {
  var GoogleAnalyticsTrackingMixinObject = Ember.Object.extend(GoogleAnalyticsTrackingMixinMixin);
  var subject = GoogleAnalyticsTrackingMixinObject.create();
  assert.ok(subject);
});
