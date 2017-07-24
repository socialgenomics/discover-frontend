import { expect } from 'chai';
import { describe, it } from 'mocha';
import Ember from 'ember';
import RequestSubmissionMixin from 'repositive/mixins/request-submission';

describe('Unit | Mixin | request submission', function() {
  // Replace this with your real tests.
  it('works', function() {
    let RequestSubmissionObject = Ember.Object.extend(RequestSubmissionMixin);
    let subject = RequestSubmissionObject.create();
    expect(subject).to.be.ok;
  });
});
