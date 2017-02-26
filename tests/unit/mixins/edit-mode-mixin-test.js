import { expect } from 'chai';
import { describe, it } from 'mocha';
import Ember from 'ember';
import EditModeMixinMixin from 'repositive/mixins/edit-mode-mixin';

describe('Unit | Mixin | edit mode mixin', function() {
  // Replace this with your real tests.
  it('works', function() {
    let EditModeMixinObject = Ember.Object.extend(EditModeMixinMixin);
    let subject = EditModeMixinObject.create();
    expect(subject).to.be.ok;
  });
});
