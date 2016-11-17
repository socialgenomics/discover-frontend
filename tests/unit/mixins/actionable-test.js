/* jshint expr:true */
import { expect } from 'chai';
import {
  describe,
  it
} from 'mocha';
import Ember from 'ember';
import ActionableMixin from 'repositive/mixins/actionable';

describe('ActionableMixin', function() {
  // Replace this with your real tests.
  it('works', function() {
    let ActionableObject = Ember.Object.extend(ActionableMixin);
    let subject = ActionableObject.create();
    expect(subject).to.be.ok;
  });
});
