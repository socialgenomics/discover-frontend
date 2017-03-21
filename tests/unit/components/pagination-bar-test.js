import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';

describe('Unit | Component | filters list', function() {
  setupComponentTest('pagination-bar', {
    unit: true,
    needs: [
      'component:fa-icon',
      'component:pagination-number-button'
    ]
  });

  describe('_updatePageNumberList', function () {
    const props = {
      pageNumbers: [1, 2, 3, 4, 5],
      currentPageNumber: 7,
      totalPages: 10
    };
    it('should return updated page numbers array', function () {
      const component = this.subject();
      expect(component._updatePageNumberList(
        props.pageNumbers,
        props.currentPageNumber,
        props.totalPages).toString()).to.eql('5,6,7,8,9');
    });
  });
});
