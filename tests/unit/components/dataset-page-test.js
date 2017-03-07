import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import sinon from 'sinon';
import Ember from 'ember';

const { get, set, setProperties, merge } = Ember;

describe('Unit | Component | dataset page', function() {
  setupComponentTest('dataset-page', {
    needs: [
      'validator:presence',
      'validator:format'
    ],
    unit: true
  });

  const id = 123;
  const modelName = 'modelName';

  describe('computed properties', function () {
    describe('modelName', function () {
      const prop = this.title;

      it('should return model name', function () {
        const component = this.subject();

        set(component, 'model', { constructor: { modelName } });

        expect(get(component, prop)).to.be.equal(modelName);
      });
    });

    describe('modelUrl', function () {
      const prop = this.title;

      it('should return url', function () {
        const component = this.subject();
        const url = 'url';

        setProperties(component, {
          model: { id },
          modelName,
          urlGenerator: { generateUrl: sinon.stub().returns(url) }
        });

        expect(get(component, prop)).to.be.equal(url);
        expect(get(component, 'urlGenerator').generateUrl.calledWith(`${modelName}s.detail`, id)).to.be.true;
      });
    });
  });

  describe('custom methods', function () {
    describe('_createNewRecordData', function () {
      const method = this.title;
      const type = 'foo';
      const expectedCommonProps = {
        actionableId: id,
        actionable_model: modelName,
        userId: id,
        type
      };

      it('should return common props for given type', function () {
        const component = this.subject();

        setProperties(component, {
          model: { actionableId: id },
          modelName,
          session: { authenticatedUser: id }
        });

        expect(component[method](type)).to.eql(expectedCommonProps);
      });

      it('should return common props for given type together custom props', function () {
        const component = this.subject();
        const customProps = { custom: true };

        setProperties(component, {
          model: { actionableId: id },
          modelName,
          session: { authenticatedUser: id }
        });

        expect(component[method](type, customProps)).to.eql(merge(customProps, expectedCommonProps));
      });
    });
  });
});
