/* jshint expr:true */
import { expect } from 'chai';
import {
  describe,
  it
} from 'mocha';
import Ember from 'ember';
import LoadFavouritesMixin from 'repositive/mixins/load-favourites';

describe('LoadFavouritesMixin', function() {
  // Replace this with your real tests.
  it('works', function() {
    let LoadFavouritesObject = Ember.Object.extend(LoadFavouritesMixin);
    let subject = LoadFavouritesObject.create();
    expect(subject).to.be.ok;
  });
});
