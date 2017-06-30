import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupTest } from 'ember-mocha';

// const attributeActions = [
//   {
//     'id': 'a1',
//     'properties': {
//       'key': 'ABC',
//       'value': 'someActionAttr'
//     },
//     'userId': {
//       'id': 'u1'
//     }
//   }
// ];
// const attributesFromDataset = {
//   assay: ['123', '456'],
//   tissue: ['heart']
// };

describe('Unit | Route | datasets/detail', function() {
  setupTest('route:datasets/detail', {
    // Specify the other units that are required for this test.
    needs: [
      'service:metrics',
      'service:session',
      'service:ajax'
    ]
  });
  describe('setupController', function() {
    describe('attributes', function() {
      //TODO refactor these controller tests to route tests
      // it('should return an empty array if dependant props are empty', function() {
      //   const route = this.subject();
      //   const result = route.get('attributes');
      //   expect(result).to.eql([]);
      // });
      //
      // it('should return an array of attr objs', function() {
      //   const route = this.subject();
      //   const dataset = {
      //     properties: { attributes: attributesFromDataset },
      //     actionableId: { actions: attributeActions }
      //   }
      //   route.set('model', { dataset });
      //   const result = route.get('attributes');
      //   expect(result.length).to.eql(3);
      //   expect(result[0].key).to.eql('assay');
      //   expect(result[0].value).to.eql('123');
      // });
      //
      // it('should reject all null values in pmid array', function() {
      //   const route = this.subject();
      //   const dataset = {
      //     properties: { attributes: { pmid: [null, 123] } }
      //   }
      //   route.set('model', { dataset });
      //   const result = route.get('attributes');
      //   expect(result.length).to.eql(1);
      //   expect(result[0].key).to.eql('pmid');
      //   expect(result[0].value).to.eql(123);
      // });
    })
    it('exists', function() {
      let route = this.subject();
      expect(route).to.be.ok;
    });
  });
});
