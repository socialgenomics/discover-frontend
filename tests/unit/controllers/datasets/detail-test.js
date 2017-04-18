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

  describe('_mergeAttributes', function() {
    describe('when no args supplied', function() {
      it('should return an empty list', function() {
        const controller = this.subject();
        expect(controller._mergeAttributes()).to.eql([]);
      });
    });

    describe('when only action attributes are supplied', function() {
      it('should return a list of action attribute objects', function() {
        const controller = this.subject();
        expect(controller._mergeAttributes(attributeActions).length).to.eql(1);
        expect(controller._mergeAttributes(attributeActions)[0].actionId).to.eql('a1');
      });
    });

    describe('when only dataset attributes are supplied', function() {
      it('should return a list of dataset attribute objects', function() {
        const controller = this.subject();
        const result = controller._mergeAttributes([], attributesFromDataset);
        expect(result.length).to.eql(3);
        expect(result[0].value).to.eql('123');
      });
    });

    describe('when dataset attributes and action attributes are supplied', function() {
      it('should return a list of merged attributes', function() {
        const controller = this.subject();
        const result = controller._mergeAttributes(attributeActions, attributesFromDataset);
        expect(result.length).to.eql(4);
        expect(result[0].value).to.eql('123');
        expect(result[3].value).to.eql('someActionAttr');
      });
    });
  });

  describe('_convertActionToCommonObj', function() {
    it('should return an object with correct values', function() {
      const controller = this.subject();
      const result = controller._convertActionToCommonObj(attributeActions[0]);
      expect(result.key).to.eql('ABC');
      expect(result.value).to.eql('someActionAttr');
      expect(result.userId).to.eql('u1');
      expect(result.actionId).to.eql('a1');
    });
  });

  describe('_convertDatasetAttrsToCommonObjList', function() {
    it('should return an object with correct values', function() {
      const controller = this.subject();
      const result = controller._convertDatasetAttrsToCommonObjList(attributesFromDataset);
      expect(result.length).to.eql(3);
      expect(result[2].key).to.eql('tissue');
      expect(result[2].value).to.eql('heart');
    });

    it('should return an empty array if an empty object is supplied', function() {
      const controller = this.subject();
      const result = controller._convertDatasetAttrsToCommonObjList({});
      expect(result).to.eql([]);
    });
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
  });
});
