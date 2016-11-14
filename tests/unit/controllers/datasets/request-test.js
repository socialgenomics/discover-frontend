/* jshint expr:true */
import Ember from 'ember';
import { expect } from 'chai';
import sinon from 'sinon';
import { describeModule, it } from 'ember-mocha';

const { get, setProperties } = Ember;

function mockParams(controller) {
  setProperties(controller, {
    loading: true,
    didRequest: false,
    addFlashMessage: sinon.spy(),
    trackEvent: sinon.spy(),
    transitionToRoute: sinon.spy()
  });
}

describeModule(
  'controller:datasets/request',
  'DatasetsRequestController',
  {
    needs: [
      'service:session',
      'service:metrics',
      'ember-metrics@metrics-adapter:google-analytics'
    ]
  },
  function() {
    it('_createRequest creates dataset with correct data', function () {
      const controller = this.subject();
      const storeMock = { save: sinon.spy() };
      const store = { createRecord: sinon.stub().returns(storeMock) };
      const title = 'lorem ipsum';
      const description = 'lorem ipsum dolor';

      setProperties(controller, { store, title, description });

      controller._createRequest();

      const expectedDataObj = store.createRecord.args[0][1];

      expect(store.createRecord.args[0][0]).to.eql('request');
      expect(expectedDataObj).to.have.keys('title', 'description', 'userId');
      expect(expectedDataObj).to.have.property('title', title);
      expect(expectedDataObj).to.have.property('description', description);
      expect(storeMock.save.called).to.eql(true);
    });

    it('_createRequestSuccess sets didRequest to true', function () {
      const controller = this.subject();
      const request = { id: '12345' };

      mockParams(controller);
      controller._createRequestSuccess(request);

      expect(get(controller, 'didRequest')).to.eql(true);
    });

    it('_createRequestSuccess add flash message', function () {
      const controller = this.subject();
      const request = { id: '12345' };

      mockParams(controller);
      controller._createRequestSuccess(request);

      expect(get(controller, 'addFlashMessage').calledWith('Request created successfully.', 'success')).to.eql(true);
    });

    it('_createRequestSuccess tracks event', function () {
      const controller = this.subject();
      const request = { id: '12345' };

      mockParams(controller);
      controller._createRequestSuccess(request);

      expect(get(controller, 'trackEvent').calledWith('dataset', 'request', request.id)).to.eql(true);
    });

    it('_createRequestSuccess does transition', function () {
      const controller = this.subject();
      const request = { id: '12345' };

      mockParams(controller);
      controller._createRequestSuccess(request);

      expect(get(controller, 'transitionToRoute').calledWith('requests.detail', request.id)).to.eql(true);
    });

    it('_createRequestError sets loading to false', function () {
      const controller = this.subject();
      const error = 'lorem ipsum';

      mockParams(controller);
      controller._createRequestError(error);

      expect(get(controller, 'loading')).to.eql(false);
    });

    it('_createRequestError add flash message', function () {
      const controller = this.subject();
      const error = 'lorem ipsum';

      mockParams(controller);
      controller._createRequestError(error);

      expect(
        get(controller, 'addFlashMessage').calledWith(
          'Oh dear. There was a problem submitting your dataset request.', 'warning'
        )
      ).to.eql(true);
    });
  }
);
