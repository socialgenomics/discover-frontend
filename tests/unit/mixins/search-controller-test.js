/* jshint expr:true */
import { expect } from 'chai';
import {
  describe,
  it
} from 'mocha';
import Ember from 'ember';
import SearchControllerMixin from 'repositive/mixins/search-controller';

describe('SearchControllerMixin', function() {
  it('Adds query and page queryParams to the object', function() {
    let SearchControllerObject = Ember.Object.extend(SearchControllerMixin);
    let subject = SearchControllerObject.create();
    expect(subject.get('queryParams').toString()).to.eql('query,page,resultsPerPage');
  });

  it('Sets default values for query and page on the object', function() {
    let SearchControllerObject = Ember.Object.extend(SearchControllerMixin);
    let subject = SearchControllerObject.create();
    expect(subject.get('page')).to.eql(1);
    expect(subject.get('query')).to.eql(null);
  });
});
