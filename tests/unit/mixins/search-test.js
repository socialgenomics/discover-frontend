import { expect } from 'chai';
import { describe, it } from 'mocha';
import Ember from 'ember';
import SearchMixin from 'repositive/mixins/search';

describe('Unit | Mixin | search', function() {
  const { set, get } = Ember;
  const MixinObj = Ember.Object.extend(SearchMixin);

  let mixinObjInstance;

  beforeEach(function () {
    mixinObjInstance = MixinObj.create();
  });

  describe('queryParams', function () {
    let paramsNames;

    beforeEach(function () {
      paramsNames = Object.keys(get(mixinObjInstance, 'queryParams'));
    });

    it('should have correct query params set', function () {
      expect(paramsNames).to.be.deep.equal(['query', 'page', 'resultsPerPage']);
    });

    it('should force model refresh on query param value change', function () {
      paramsNames.forEach(param => {
        const paramConfig = get(mixinObjInstance, `queryParams.${param}`);

        expect(paramConfig).to.be.an('object');
        expect(paramConfig.refreshModel).to.be.true;
      });
    });
  });

  describe('resetController', function () {
    const hook = this.title;

    let controllerMock;

    beforeEach(function () {
      controllerMock = Ember.Object.create({ query: 'test' });
    });

    it('should set query to empty string when exiting the route', function () {
      mixinObjInstance[hook](controllerMock, true);
      expect(get(controllerMock, 'query')).to.be.equal('');
    });

    it('should not set query to empty string', function () {
      mixinObjInstance[hook](controllerMock, false);
      expect(get(controllerMock, 'query')).to.be.equal('test');
    });
  })
});
