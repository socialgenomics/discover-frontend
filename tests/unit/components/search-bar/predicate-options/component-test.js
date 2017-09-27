import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';

describe('Unit | Component | search bar/predicate options', function() {
  setupComponentTest('search-bar/predicate-options', {
    unit: true
  });

  describe('predicatedOptions', function() {
    it('returns correctly filtered objects', function() {
      const component = this.subject();
      const extraArgs = { extra: { queryString: 'is' } };

      component.set('attrs', extraArgs);

      const result = component.get('predicateOptions');
      const expected = [
        { name: 'Disease', example: '(e.g. Myeloma)' },
        { name: 'Tissue', example: '(e.g. Blood)' }
      ];
      expect(result).to.eql(expected);
    });
  });
});
