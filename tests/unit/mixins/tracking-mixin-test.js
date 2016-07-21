/* jshint expr:true */
import { expect } from 'chai';
import {
  describe,
  it
} from 'mocha';
import Ember from 'ember';
import TrackingMixin from 'repositive/mixins/tracking-mixin';

describe('TrackingMixin', function() {
  // Replace this with your real tests.
  it('works', function() {
    let TrackingMixinObject = Ember.Object.extend(TrackingMixin);
    let subject = TrackingMixinObject.create();
    expect(subject).to.be.ok;
  });
});
