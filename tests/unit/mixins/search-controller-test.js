/* jshint expr:true */
import { expect } from 'chai';
import {
  describe,
  it
} from 'mocha';
import Ember from 'ember';
import SearchControllerMixin from 'repositive/mixins/search-controller';

describe('SearchControllerMixin', function() {
  // Replace this with your real tests.
  it('works', function() {
    let SearchControllerObject = Ember.Object.extend(SearchControllerMixin);
    let subject = SearchControllerObject.create();
    expect(subject).to.be.ok;
  });
});
