import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';

describe('Unit | Component | filters list', function() {
  const { get, set, setProperties, merge } = Ember;

  setupComponentTest('pagination-bar', {
    unit: true,
    needs: [
      'component:fa-icon',
      'component:pagination-number-button'
    ]
  });

  describe('_updatePageNumberList', function () {
    const computed = this.title;
    const expectedCommonProps = {
      pageNumbers: [1, 2, 3, 4, 5],
      currentPageNumber: 7,
      totalPages: 10
    };

    it('renders', function() {
      // creates the component instance
      const component = this.subject();
      expect(component._state).to.equal('preRender');

      // renders the component on the page
      this.render();
      expect(component._state).to.equal('inDOM');
    });

    // it('should return updated page numbers array', function () {
    //   const component = this.subject();
    //   const customProps = { custom: true };
    //
    //   component.setProperties({
    //     pageNumbers: [1, 2, 3, 4, 5],
    //     currentPageNumber: 7,
    //     totalPages: 10
    //   });
    //
    //   this.render(hbs`{{pagination-bar currentPageNumber=currentPageNumber totalPages=totalPages}}`);
    //
    //   expect(component[computed](customProps)).to.eql(merge(customProps, expectedCommonProps));
    // });
  });
});
