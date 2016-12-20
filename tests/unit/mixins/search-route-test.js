/* jshint expr:true */
import { expect } from 'chai';
import {
  describe,
  it
} from 'mocha';
import Ember from 'ember';
import SearchRouteMixin from 'repositive/mixins/search-route';

describe('SearchRouteMixin', function() {
  it('Adds refreshModel:true to query and page queryParams', function() {
    let SearchRouteObject = Ember.Object.extend(SearchRouteMixin);
    let subject = SearchRouteObject.create();
    expect(subject.get('queryParams.query.refreshModel')).to.be.true;
    expect(subject.get('queryParams.page.refreshModel')).to.be.true;
  });
});
