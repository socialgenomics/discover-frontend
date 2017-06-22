import { expect } from 'chai';
import { describe, it } from 'mocha';
import Ember from 'ember';
import InfiniteScrollMixin from 'repositive/mixins/infinite-scroll';

describe('Unit | Mixin | infinite scroll', function() {
  describe('_buildRequestObj', function() {
    it('creates an object with limit and offset', function() {
      let InfiniteScrollObject = Ember.Object.extend(InfiniteScrollMixin);
      let subject = InfiniteScrollObject.create();

      expect(Object.keys(subject._buildRequestObj(10, 20)))
        .to.have.members(['offset', 'limit', 'order[0][0]', 'order[0][1]']);
    });

    it('adds custom properties to the object', function() {
      let InfiniteScrollObject = Ember.Object.extend(InfiniteScrollMixin);
      let subject = InfiniteScrollObject.create();

      expect(Object.keys(subject._buildRequestObj(10, 20, { 'abc': 123 })))
        .to.have.members(['offset', 'limit', 'order[0][0]', 'order[0][1]', 'abc']);
    });
  })
});
