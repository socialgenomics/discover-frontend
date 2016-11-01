/* jshint expr:true */
import { expect } from 'chai';
import {
  describe,
  it
} from 'mocha';
import Ember from 'ember';
import RememberScrollMixin from 'repositive/mixins/remember-scroll';

describe('RememberScrollMixin', function() {
  // Replace this with your real tests.
  it('works', function() {
    let RememberScrollObject = Ember.Object.extend(RememberScrollMixin);
    let subject = RememberScrollObject.create();
    expect(subject).to.be.ok;
  });
});
