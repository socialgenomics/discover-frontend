import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import sinon from 'sinon';
import Ember from 'ember';

const { get, set, setProperties } = Ember;

describe('Unit | Component | dataset page', function() {
  setupComponentTest('dataset-page', {
    needs: [
      'validator:presence',
      'validator:format',
      'service:session',
      'service:urlGenerator'
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
});
