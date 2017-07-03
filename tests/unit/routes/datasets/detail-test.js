import Ember from 'ember';
import { expect } from 'chai';
import { beforeEach, describe, it } from 'mocha';
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

const attributesFromDataset = {
  assay: ['123', '456'],
  tissue: ['heart']
};

function createControllerMock() {
  return Ember.Object.create({});
}

function createModelMock() {
  return Ember.Object.create({
    dataset: createDatasetMock(),
    attributes: [],
    comments: [],
    tags: []
  })
}

function createDatasetMock(attributes = {}) {
  return Ember.Object.create({
    properties: { attributes }
  });
}

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
    let controller, model;

    beforeEach(function() {
      controller = createControllerMock();
      model = createModelMock();
    });

    describe('action arrays', function() {
      it('should be initialized as empty lists', function() {
        const route = this.subject();
        route.setupController(controller, model);
        expect(controller.attributes).to.eql([]);
        expect(controller.comments).to.eql([]);
        expect(controller.tags).to.eql([]);
      });
    });

    describe('attributes', function () {
      it('should return an array of attr objs', function() {
        const route = this.subject();
        model.set('dataset', createDatasetMock(attributesFromDataset));
        route.setupController(controller, model);

        const result = controller.get('attributes');
        expect(result.length).to.eql(3);
        expect(result[0].key).to.eql('assay');
        expect(result[0].value).to.eql('123');
      });

      it('should reject all null values in pmid array', function() {
        const route = this.subject();
        const dataset = createDatasetMock({ pmid: [null, null, 123]});
        model.set('dataset', dataset);
        route.setupController(controller, model);

        const result = controller.get('attributes');
        expect(result.length).to.eql(1);
        expect(result[0].key).to.eql('pmid');
        expect(result[0].value).to.eql(123);
      });
    });
  });
});
