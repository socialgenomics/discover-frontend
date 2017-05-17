import { expect } from 'chai';
import { describe, it } from 'mocha';
import Ember from 'ember';
import VerificationMixin from 'repositive/mixins/verification';

describe('Unit | Mixin | verification', function() {
  // Replace this with your real tests.
  it('works', function() {
    let VerificationObject = Ember.Object.extend(VerificationMixin);
    let subject = VerificationObject.create();
    expect(subject).to.be.ok;
  });
});
