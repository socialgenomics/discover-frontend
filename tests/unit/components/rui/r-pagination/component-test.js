import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import Ember from 'ember';

const { setProperties } = Ember;

describe('Unit | Component | pagination bar', function() {
  setupComponentTest('rui/r-pagination', {
    unit: true,
    needs: [
      'component:fa-icon',
      'component:rui/r-pagination/button'
    ]
  });

  describe('_updatePageNumberList', function () {
    let props = {
      pageNumbers: [1, 2, 3, 4, 5],
      currentPageNumber: 1,
      totalPages: 5
    };

    it('should return default page numbers', function () {
      const component = this.subject();

      expect(component._updatePageNumberList(
        props.pageNumbers,
        props.currentPageNumber,
        props.totalPages).toString()).to.eql('1,2,3,4,5');
    });

    it('should return updated page numbers array', function () {
      const component = this.subject();

      setProperties(props, {
        currentPageNumber: 7,
        totalPages: 10
      });

      expect(component._updatePageNumberList(
        props.pageNumbers,
        props.currentPageNumber,
        props.totalPages).toString()).to.eql('5,6,7,8,9');
    });

    it('should return end of page numbers array for penultimate page', function () {
      const component = this.subject();

      setProperties(props, {
        currentPageNumber: 14,
        totalPages: 15
      });

      expect(component._updatePageNumberList(
        props.pageNumbers,
        props.currentPageNumber,
        props.totalPages).toString()).to.eql('11,12,13,14,15');
    });

    it('should only display positive numbers', function () {
      const component = this.subject();

      setProperties(props, {
        currentPageNumber: 1,
        totalPages: 2
      });

      expect(component._updatePageNumberList(
        props.pageNumbers,
        props.currentPageNumber,
        props.totalPages).toString()).to.eql('1,2');
    });
  });
});
