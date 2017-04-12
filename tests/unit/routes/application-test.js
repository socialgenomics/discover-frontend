import Ember from 'ember';
import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupTest } from 'ember-mocha';
import sinon from 'sinon';

const { get, set, setProperties } = Ember;

describe('Unit | Route | application', function() {
  setupTest('route:application', {
    needs: [
      'service:metrics',
      'service:session',
      'service:urlGenerator'
    ]
  });

  it('search calls _conditionallyTransition with correct args when collection predicate applied', function() {
    const route = this.subject();
    const queryString = 'collection:"ABC"';
    set(route, 'metrics', { trackEvent: sinon.stub() });
    route._conditionallyTransition = sinon.spy();
    route.send('search', queryString, 1);
    expect(route._conditionallyTransition.calledWith([{ predicate: 'collection', text: 'ABC' }], [], queryString, 1)).to.be.true;
  });

  it('search calls _conditionallyTransition with correct args when datasource predicate applied', function() {
    const route = this.subject();
    const queryString = 'datasource:SRA';
    set(route, 'metrics', { trackEvent: sinon.stub() });
    route._conditionallyTransition = sinon.spy();
    route.send('search', queryString, 1);
    expect(route._conditionallyTransition.calledWith([], [{ predicate: 'datasource', text: 'SRA' }], queryString, 1)).to.be.true;
  });

  it('search event is tracked', function() {
    const route = this.subject();
    const queryString = 'datasource:SRA';
    const trackingObj = {
      category: 'discover_openpage_searchbar',
      action: 'query',
      label: queryString
    };
    set(route, 'metrics', { trackEvent: sinon.spy() });
    route._conditionallyTransition = sinon.stub();
    route.send('search', queryString, 1);
    expect(get(route, 'metrics').trackEvent.calledOnce).to.be.true;
    expect(get(route, 'metrics').trackEvent.calledWith(trackingObj)).to.be.true;
  });

  it('_conditionallyTransition calls _queryAndTransition with a collection predicate on a collection rotue', function() {
    const route = this.subject();
    const queryString = 'collection:"ABC"';
    setProperties(route, {
      'metrics': { trackEvent: sinon.stub() },
      'controller': { currentPath: 'collections.collection' }
    });
    route._queryAndTransition = sinon.spy();
    route._conditionallyTransition([{ predicate: 'collection', text: 'ABC' }], [], queryString, 1);
    expect(route._queryAndTransition.calledWith('collections.collection', { predicate: 'collection', text: 'ABC' }, queryString, 1)).to.be.true;
  });

  it('when in search route, all searches remain in that route', function() {
    const route = this.subject();
    const queryString = 'collection:"ABC" lung';
    const currentPath = 'datasets.search';
    const queryParams = {
      queryParams: {
        query: queryString,
        page: 1
      }
    };
    setProperties(route, {
      'metrics': { trackEvent: sinon.stub() },
      'controller': { currentPath: currentPath }
    });
    route._queryAndTransition = sinon.stub();
    route.transitionTo = sinon.spy();
    route._conditionallyTransition([{ predicate: 'collection', text: 'ABC' }], [], queryString, 1);
    expect(route.transitionTo.calledWith(queryParams));
  });

  it('when in datasource route, making a search with no datasource predicate takes you to search route', function() {
    const route = this.subject();
    const queryString = 'lung';
    const currentPath = 'datasources.datasource';
    const queryParams = {
      queryParams: {
        query: queryString,
        page: 1
      }
    };
    setProperties(route, {
      'metrics': { trackEvent: sinon.stub() },
      'controller': { currentPath: currentPath }
    });
    route._queryAndTransition = sinon.stub();
    route.transitionTo = sinon.spy();
    route._conditionallyTransition([], [], queryString, 1);
    expect(route.transitionTo.calledWith(queryParams));
  });

  describe('_getErrorRouteNameFromSearchQuery', function () {
    it('should return collections search error route', function () {
      const dataProvider = [
        'collection:"dadasda" adadad',
        'collection:"dadasda"adadad',
        'collection:"dadasda";',
        'dadad collection:"dadasda"',
        'dadadcollection:"dadasda"'
      ];

      dataProvider.forEach(query => {
        expect(this.subject()._getErrorRouteNameFromSearchQuery(query)).to.be.equal('collections.search-error');
      });
    });

    it('should return datasources search error route', function () {
      const dataProvider = [
        'datasource:dadasda adadad',
        'datasource:dadasdaadadad',
        'datasource:dadasda;',
        'dadad datasource:dadasda',
        'dadaddatasource:dadasda'
      ];

      dataProvider.forEach(query => {
        expect(this.subject()._getErrorRouteNameFromSearchQuery(query)).to.be.equal('datasources.search-error');
      });
    });

    it('should return datasets search error route', function () {
      expect(this.subject()._getErrorRouteNameFromSearchQuery('tests 123')).to.be.equal('datasets.search-error');
    });
  });
});
