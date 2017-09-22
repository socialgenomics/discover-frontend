import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';

describe('!T Unit | Component | search bar', function() {
  setupComponentTest('search-bar', {
    needs: [
      'service:query',
      'service:ajax',
      'service:session',
      'service:metrics'
    ],
    unit: true
  });

  describe('_handleAutocompleteSuccess', function() {
    describe('when the response has keys', function() {
      it('returns a list of grouped suggestions', function() {
        const component = this.subject();
        const resp = {
          tissue: ['brain', 'lung'],
          technology: ['ic-1']
        };
        const expected = [
          {
            groupName: 'Tissue',
            options: [
              { groupName: 'tissue', suggestionText: 'brain'},
              { groupName: 'tissue', suggestionText: 'lung'}
            ]
          },
          {
            groupName: 'Technology',
            options: [
              { groupName: 'technology', suggestionText: 'ic-1'}
            ]
          }
        ];
        const result = component._handleAutocompleteSuccess(resp);
        expect(result).to.eql(expected);
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
