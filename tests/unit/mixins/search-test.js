import { expect } from 'chai';
import { describe, it, beforeEach } from 'mocha';
import { setupTest } from 'ember-mocha';
import Ember from 'ember';
import sinon from 'sinon';
import SearchMixin from 'repositive/mixins/search';
import ENV from 'repositive/config/environment';

describe('Unit | Mixin | search', function() {
  const { set, get, Service, RSVP, getOwner, setProperties } = Ember;
  const query = 'lorem ipsum';
  const parseStringVal = { lorem: 'ipsum' };
  const getFiltersVal = [{ predicate: 'a', text: 'A' }, { predicate: 'b', text: 'B' }, { predicate: 'c', text: 'C' }];
  const toBoolStringVal = 'queryBoolString';
  const aggs = {
    a: { buckets: [{ key: 1 }, { key: 2 }, { key: 3 }] },
    b: { buckets: [{ key: 4 }, { key: 5 }, { key: 6 }] }
  };
  const ajaxServiceStub = Service.extend({
    request: sinon.stub().returns(RSVP.resolve('response'))
  });
  const queryServiceStub = Service.extend({
    setQueryString: sinon.spy()
  });
  const storeServiceStub = Service.extend({
    push: sinon.stub().returnsArg(0),
    normalize: sinon.stub().returnsArg(1)
  });

  let mixinObjInstance;


  function createQPMock(parseStringVal = '', getFiltersVal = [], toBoolStringVal = '') {
    return {
      parseString: sinon.stub().returns(parseStringVal),
      getFilters: sinon.stub().returns(getFiltersVal),
      toBoolString: sinon.stub().returns(toBoolStringVal)
    };
  }

  setupTest('mixin:search', {
    subject() {
      const searchMixinObj = Ember.Object.extend(SearchMixin);

      this.register('test-container:searchMixinObj', searchMixinObj);
      this.register('service:ajax', ajaxServiceStub);
      this.register('service:query', queryServiceStub);
      this.register('service:store', storeServiceStub);
      this.inject.service('ajax', { as: 'ajax' });
      this.inject.service('query', { as: 'query' });
      this.inject.service('store', { as: 'store' });

      return getOwner(this).lookup('test-container:searchMixinObj');
    }
  });

  beforeEach(function () {
    mixinObjInstance = this.subject();

    get(mixinObjInstance, 'ajax.request').reset();
    get(mixinObjInstance, 'queryService.setQueryString').reset();

    setProperties(mixinObjInstance, {
      query: 'test',
      QP: createQPMock(parseStringVal, getFiltersVal, toBoolStringVal)
    });
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
  });

  describe('getActiveFilters', function () {
    const method = this.title;

    it('should call QP.parseString with query', function () {
      mixinObjInstance[method]();

      expect(get(mixinObjInstance, 'QP').parseString.calledOnce).to.be.true;
      expect(get(mixinObjInstance, 'QP').parseString.calledWith(get(mixinObjInstance, 'query'))).to.be.true;
    });

    it('should call QP.getFilters with queryTree', function () {
      mixinObjInstance[method]();

      expect(get(mixinObjInstance, 'QP').getFilters.calledOnce).to.be.true;
      expect(get(mixinObjInstance, 'QP').getFilters.calledWith(parseStringVal)).to.be.true;
    });

    it('should return correct value', function () {
      expect(mixinObjInstance[method]()).to.be.deep.equal(['a:A', 'b:B', 'c:C']);
    });
  });

  describe('makeRequest', function () {
    const method = this.title;
    const page = 1;
    beforeEach(function () {
      setProperties(mixinObjInstance, {
        'ajax.request': sinon.stub().returns({ then: sinon.stub() }),
        _handleQueryResponse: sinon.spy()
      });
    });

    it('should call ajax.request with correct params', function () {
      mixinObjInstance[method]({ page });

      expect(get(mixinObjInstance, 'ajax.request').calledOnce).to.be.true;
      expect(
        get(mixinObjInstance, 'ajax.request').calledWith(
          ENV.APIRoutes['datasets.search'],
          {
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ type: 'dataset', offset: 0, limit: 6, body: {} })
          }
        )
      ).to.be.true;
    });

    it('should use default limit', function () {
      mixinObjInstance[method]({ page });

      expect(JSON.parse(get(mixinObjInstance, 'ajax.request').args[0][1].data).limit).to.be.equal(6);
    });

    it('should use custom limit', function () {
      const resultsPerPage = 2;

      mixinObjInstance[method]({ page, resultsPerPage });

      expect(
        JSON.parse(get(mixinObjInstance, 'ajax.request').args[0][1].data).limit
      ).to.be.equal(resultsPerPage);
    });

    it('should pass empty object as "body" to ajax request data', function () {
      mixinObjInstance[method]({ page });

      expect(
        JSON.parse(get(mixinObjInstance, 'ajax.request').args[0][1].data).body
      ).to.be.eql({});
    });

    it('should pass query object as "body" to ajax request data', function () {
      mixinObjInstance[method]({ page, query });

      expect(
        get(mixinObjInstance, 'QP').parseString.calledWith(query)
      ).to.be.true;
      expect(
        JSON.parse(get(mixinObjInstance, 'ajax.request').args[0][1].data).body
      ).to.be.eql(parseStringVal);
    });
  });

  describe('_updateQueryServiceValue', function () {
    const method = this.title;

    it('should update query service value', function () {
      const QP = get(mixinObjInstance, 'QP');

      mixinObjInstance[method](query);

      expect(QP.parseString.calledWith(query)).to.be.true;
      expect(QP.toBoolString.calledWith(parseStringVal)).to.be.true;
      expect(get(mixinObjInstance, 'queryService').setQueryString.calledWith(toBoolStringVal)).to.be.true;
    });

    it('should set query service value to null', function () {
      mixinObjInstance[method]();

      expect(get(mixinObjInstance, 'queryService').setQueryString.calledWith(null)).to.be.true;
    });
  });

  describe('_handleQueryResponse', function () {
    const method = this.title;
    const response = {
      datasets: ['a', 'b', 'c'],
      aggs
    };

    beforeEach(function () {
      set(mixinObjInstance, '_normalizeFilters', sinon.stub().returnsArg(0));
    });

    it('should push datasets to store', function () {
      const store = get(mixinObjInstance, 'store');

      mixinObjInstance[method](response);

      response.datasets.forEach(dataset => {
        expect(store.normalize.calledWith('dataset', dataset));
        expect(store.push.calledWith(dataset));
      });
    });

    it('should normalize filters', function () {
      mixinObjInstance[method](response);

      expect(get(mixinObjInstance, '_normalizeFilters').calledWith(response.aggs)).to.be.true;
    });

    it('should return response', function () {
      expect(mixinObjInstance[method](response)).to.eql(response);
    });
  });

  describe('_normalizeFilters', function () {
    const method = this.title;

    it('should return normalized filters array', function () {
      function extendBuckets(bucket) {
        bucket.color = bucket.key;

        return bucket;
      }

      set(mixinObjInstance, 'getColour', sinon.stub().returnsArg(0));

      expect(mixinObjInstance[method](aggs)).to.eql(
        Object.keys(aggs).map(key => {
          return { name: key, displayName: key.capitalize(), buckets: aggs[key].buckets.map(extendBuckets) };
        })
      );
    });
  });
});
