import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import Ember from 'ember';

describe('Unit | Component | filters list', function() {
  const { get, set } = Ember;

  function createFiltersMock(filters) {
    return Object.keys(filters).map(name => { return { name, buckets: new Array(filters[name]) }; });
  }

  setupComponentTest('filters-list', {
    unit: true
  });

  describe('isEmptyFilters', function () {
    const computed = this.title;

    it('should return true', function () {
      const component = this.subject();

      set(component, 'filters', createFiltersMock({ a: 0, b: 0, c: 0 }));
      expect(get(component, computed)).to.be.true;
    });

    it('should return false', function () {
      const component = this.subject();
      const dataProvider = [
        { a: 1, b: 0, c: 0 },
        { a: 0, b: 1, c: 0 },
        { a: 0, b: 0, c: 1 }
      ];

      dataProvider.forEach(dataset => {
        set(component, 'filters', createFiltersMock(dataset));
        expect(get(component, computed)).to.be.false;
      });
    });
  });
});
