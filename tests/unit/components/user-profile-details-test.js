import { expect } from 'chai';
import { describe, it, beforeEach } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import sinon from 'sinon';

describe('Unit | Component | user profile details', function() {
  let flashMessagesMock;

  beforeEach(function () {
    flashMessagesMock = { add: sinon.spy() };
  });

  setupComponentTest('user-profile-details', {
    needs: [
      'validator:presence',
      'validator:length'
    ],
    unit: true
  });

  describe('custom methods', function () {
    describe('_onSaveError', function () {
      it('should call rollbackAttributes on model', function () {
        const component = this.subject();
        const modelMock = { rollbackAttributes: sinon.spy() };

        component.set('flashMessages', flashMessagesMock);
        component._onSaveError(modelMock, null);

        expect(modelMock.rollbackAttributes.called).to.be.equal(true);
      });
    });
  });

  // TODO add more tests
});
