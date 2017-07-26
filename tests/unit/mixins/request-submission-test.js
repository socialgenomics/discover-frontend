import { expect } from 'chai';
import { beforeEach, describe, it } from 'mocha';
import { setupTest } from 'ember-mocha';
import Ember from 'ember';
import sinon from 'sinon';
import RequestSubmissionMixin from 'repositive/mixins/request-submission';

const { Service, getOwner, get, setProperties } = Ember;

function mockParams(object) {
  setProperties(object, {
    isLoading: false,
    _addFlashMessage: sinon.spy(),
    _trackEvent: sinon.spy(),
    transitionToRoute: sinon.spy()
  });
}

describe('Unit | Mixin | request submission', function() {
  const id = '123';
  const authenticatedUser = {};
  const sessionServiceStub = Service.extend({ authenticatedUser });

  let mixinObjInstance;

  setupTest('mixin:request-submission', {
    subject() {
      const RequestSubmissionMixinObj = Ember.Object.extend(RequestSubmissionMixin);

      this.register('test-container:RequestSubmissionMixinObj', RequestSubmissionMixinObj);
      this.register('service:session', sessionServiceStub);
      this.inject.service('session', { as: 'session' });

      return getOwner(this).lookup('test-container:RequestSubmissionMixinObj');
    }
  });

  beforeEach(function () {
    authenticatedUser.id = id;
    mixinObjInstance = this.subject();
  });

  it('_createRequest creates dataset with correct data', function () {
    const storeMock = { save: sinon.spy() };
    const store = { createRecord: sinon.stub().returns(storeMock) };
    const title = 'lorem ipsum';
    const description = 'lorem ipsum dolor';

    setProperties(mixinObjInstance, { store, title, description });

    mixinObjInstance._createRequest({ title, description });

    const expectedDataObj = store.createRecord.args[0][1];

    expect(store.createRecord.args[0][0]).to.eql('request');
    expect(expectedDataObj).to.have.keys('title', 'description', 'userId');
    expect(expectedDataObj).to.have.property('title', title);
    expect(expectedDataObj).to.have.property('description', description);
    expect(storeMock.save.called).to.eql(true);
  });

  describe('_createRequestSuccess', function() {
    const request = { id: '12345' };

    it('adds flash message', function () {
      mockParams(mixinObjInstance);
      mixinObjInstance._createRequestSuccess(request);

      expect(get(mixinObjInstance, '_addFlashMessage').calledWith('Request created successfully.', 'success')).to.eql(true);
    });

    it('tracks event', function () {
      mockParams(mixinObjInstance);
      mixinObjInstance._createRequestSuccess(request);

      expect(get(mixinObjInstance, '_trackEvent').calledWith('discover_homeauth_datasetRequest', 'requested', request.id)).to.eql(true);
    });

    it('does transition', function () {
      mockParams(mixinObjInstance);
      mixinObjInstance._createRequestSuccess(request);

      expect(get(mixinObjInstance, 'transitionToRoute').calledWith('requests.detail', request.id)).to.eql(true);
    });
  });

  describe('_createRequestError', function() {
    it('adds flash message', function () {
      const error = 'lorem ipsum';

      mockParams(mixinObjInstance);
      mixinObjInstance._createRequestError(error);

      expect(
        get(mixinObjInstance, '_addFlashMessage').calledWith(
          'Oh dear. There was a problem submitting your dataset request.', 'warning'
        )
      ).to.eql(true);
    });
  });
});
