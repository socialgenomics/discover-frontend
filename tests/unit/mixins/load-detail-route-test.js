/* jshint expr:true */
import { expect } from 'chai';
import {
  describe,
  it
} from 'mocha';
import Ember from 'ember';
import LoadDetailRouteMixin from 'repositive/mixins/load-detail-route';

describe('LoadDetailRouteMixin', function() {
  // Replace this with your real tests.
  it('works', function() {
    let LoadDetailRouteObject = Ember.Object.extend(LoadDetailRouteMixin);
    let subject = LoadDetailRouteObject.create();
    expect(subject).to.be.ok;
  });
});
