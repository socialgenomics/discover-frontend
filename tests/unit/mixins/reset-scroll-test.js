/* jshint expr:true */
import { expect } from 'chai';
import {
  describe,
  it
} from 'mocha';
import Ember from 'ember';
import ResetScrollMixin from 'repositive/mixins/reset-scroll';

describe('ResetScrollMixin', function() {
  // Replace this with your real tests.
  it('works', function() {
    let ResetScrollObject = Ember.Object.extend(ResetScrollMixin);
    let subject = ResetScrollObject.create();
    expect(subject).to.be.ok;
  });
});
