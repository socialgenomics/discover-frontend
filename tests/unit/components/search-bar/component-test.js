import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';

describe('Unit | Component | search bar', function() {
  setupComponentTest('search-bar', {
    needs: [
      'service:query',
      'service:ajax',
      'service:session',
      'service:metrics'
    ],
    unit: true
  });

  describe('predicatedOptions', function() {
    it('returns correctly filtered objects', function() {
      const component = this.subject();

      component.set('queryString', 'is');

      const result = component.get('predicateOptions');
      const expected = [
        { name: 'Disease', example: '(e.g. Myeloma)' },
        { name: 'Tissue', example: '(e.g. Blood)' }
      ];
      expect(result).to.eql(expected);
    });
  });

  describe('_handleAutocompleteSuccess', function() {
    describe('when the response has keys', function() {
      it('returns a list of grouped suggestions', function() {
        const component = this.subject();
        const resp = {
          suggestions: [
            {
              text: "Programming in C",
              position: { from: 16, to: 31 }
            },
            {
              text: "in Croatia",
              position: { from: 28, to: 31 }
            }
          ]
        };

        const result = component._handleAutocompleteSuccess(resp);
        expect(result).to.eql(resp.suggestions);
      });
    });
    describe('when the response does not have keys', function() {
      it('should return an empty list', function() {
        const component = this.subject();
        expect(component._handleAutocompleteSuccess({})).to.eql([]);
      });
    });
  });
});
