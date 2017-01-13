/* jshint expr:true */
import Ember from 'ember';
import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupTest } from 'ember-mocha';
import sinon from 'sinon';

const { get, set } = Ember;

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
      category: 'search',
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
    const controller = { currentPath: 'collections.collection' };
    set(route, 'metrics', { trackEvent: sinon.stub() });
    set(route, 'controller', controller);
    route._queryAndTransition = sinon.spy();
    route._conditionallyTransition([{ predicate: 'collection', text: 'ABC' }], [], queryString, 1);
    expect(route._queryAndTransition.calledWith('collections.collection', { predicate: 'collection', text: 'ABC' }, queryString, 1)).to.be.true;
  });
});
