/* jshint expr:true */
import Ember from 'ember';
import { expect } from 'chai';
import sinon from 'sinon';
import { it, describe } from 'mocha';
import { setupTest } from 'ember-mocha';

const { get, setProperties } = Ember;

function mockParams(controller) {
  setProperties(controller, {
    loading: true,
    didRegister: false,
    _addFlashMessage: sinon.spy(),
    _trackEvent: sinon.spy(),
    transitionToRoute: sinon.spy()
  });
}

describe('DatasetsRegisterController', function() {
  setupTest('controller:datasets/register', {
    needs: [
      'service:session',
      'service:metrics',
      'ember-metrics@metrics-adapter:google-analytics'
    ]
  });

  it('_createDataset creates dataset with correct data', function () {
    const controller = this.subject();
    const storeMock = { save: sinon.spy() };
    const store = { createRecord: sinon.stub().returns(storeMock) };
    const title = 'lorem ipsum';
    const description = 'lorem ipsum dolor';
    const url = 'test.com';
    const dataSource = 'test 123';
    const userModel = { id: '12345' };

    setProperties(controller, { store, title, description, url });

    controller._createDataset(userModel, dataSource);

    const expectedDataObj = store.createRecord.args[0][1];

    expect(store.createRecord.args[0][0]).to.eql('dataset');
    expect(expectedDataObj).to.have.keys('title', 'description', 'url', 'datasourceId', 'externalId', 'userId');
    expect(expectedDataObj).to.have.property('title', title);
    expect(expectedDataObj).to.have.property('description', description);
    expect(expectedDataObj).to.have.property('datasourceId', dataSource);
    expect(expectedDataObj).to.have.property('userId', userModel);
    expect(expectedDataObj.externalId).to.contain(userModel.id);
    expect(storeMock.save.called).to.eql(true);
  });

  it('_createDatasetSuccess sets didRegister to true', function () {
    const controller = this.subject();
    const dataset = { id: '12345' };

    mockParams(controller);
    controller._createDatasetSuccess(dataset);

    expect(get(controller, 'didRegister')).to.eql(true);
  });

  it('_createDatasetSuccess add flash message', function () {
    const controller = this.subject();
    const dataset = { id: '12345' };

    mockParams(controller);
    controller._createDatasetSuccess(dataset);

    expect(get(controller, '_addFlashMessage').calledWith('Dataset successfully registered', 'success')).to.eql(true);
  });

  it('_createDatasetSuccess tracks event', function () {
    const controller = this.subject();
    const dataset = { id: '12345' };

    mockParams(controller);
    controller._createDatasetSuccess(dataset);

    expect(get(controller, '_trackEvent').calledWith('dataset', 'register', dataset.id)).to.eql(true);
  });

  it('_createDatasetSuccess does transition', function () {
    const controller = this.subject();
    const dataset = { id: '12345' };

    mockParams(controller);
    controller._createDatasetSuccess(dataset);

    expect(get(controller, 'transitionToRoute').calledWith('datasets.detail', dataset.id)).to.eql(true);
  });

  it('_createDatasetError sets loading to false', function () {
    const controller = this.subject();
    const error = 'lorem ipsum';

    mockParams(controller);
    controller._createDatasetError(error);

    expect(get(controller, 'loading')).to.eql(false);
  });

  it('_createDatasetError add flash message', function () {
    const controller = this.subject();
    const error = 'lorem ipsum';

    mockParams(controller);
    controller._createDatasetError(error);

    expect(
      get(controller, '_addFlashMessage').calledWith(
        'Oh dear. There was a problem registering your dataset.', 'warning'
      )
    ).to.eql(true);
  });
});
