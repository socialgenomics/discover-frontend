import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupTest } from 'ember-mocha';

describe('Unit | Controller | datasets/detail', function() {
  const attributeActions = [
    {
      'id': 'a1',
      'properties': {
        'key': 'ABC',
        'value': 'someActionAttr'
      },
      'userId': {
        'id': 'u1'
      }
    }
  ];
  const attributesFromDataset = {
    assay: ['123', '456'],
    tissue: ['heart']
  };

  setupTest('controller:datasets/detail', {
    needs: [
      'service:metrics',
      'service:session'
    ]
  });

  describe('attributes', function() {
    it('should return an empty array if dependant props are empty', function() {
      const controller = this.subject();
      const result = controller.get('attributes');
      expect(result).to.eql([]);
    });

    it('should return an array of attr objs', function() {
      const controller = this.subject();
      const dataset = {
        properties: { attributes: attributesFromDataset },
        actionableId: { actions: attributeActions }
      }
      controller.set('model', { dataset });
      const result = controller.get('attributes');
      expect(result.length).to.eql(3);
      expect(result[0].key).to.eql('assay');
      expect(result[0].value).to.eql('123');
    });

    it('should reject all null values in pmid array', function() {
      const controller = this.subject();
      const dataset = {
        properties: { attributes: { pmid: [null, 123] } }
      }
      controller.set('model', { dataset });
      const result = controller.get('attributes');
      expect(result.length).to.eql(1);
      expect(result[0].key).to.eql('pmid');
      expect(result[0].value).to.eql(123);
    });
  });
});
