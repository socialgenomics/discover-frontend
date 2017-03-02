import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import sinon from 'sinon';
import Ember from 'ember';

const { set, setProperties, get } = Ember;
const spy = sinon.spy();
const commentMock = { rollbackAttributes: sinon.spy() };

function setupState(component) {
  setProperties(component, {
    inEditMode: true,
    _addFlashMessage: spy,
    comment: commentMock
  });
}

describe('Unit | Component | user comment', function() {
  setupComponentTest('user-comment', {
    needs: ['validator:presence'],
    unit: true
  });

  beforeEach(function () {
    spy.reset();
    commentMock.rollbackAttributes.reset();
  });

  describe('custom methods', function () {
    describe('_onEditSuccess', function () {
      const method = this.title;

      it('should set "inEditMode" to false', function () {
        const component = this.subject();

        setupState(component);
        component[method]();

        expect(get(component, 'inEditMode')).to.be.false;
      });

      it('should call flash message with correct params', function () {
        const component = this.subject();

        setupState(component);
        component[method]();

        expect(spy.calledWith('Your comment has been updated.', 'success')).to.be.true;
      });
    });

    describe('_onEditError', function () {
      const method = this.title;

      beforeEach(function () {
        commentMock.rollbackAttributes.reset();
      });

      it('should set "inEditMode" to false', function () {
        const component = this.subject();

        setupState(component);
        component[method]();

        expect(get(component, 'inEditMode')).to.be.false;
      });

      it('should rollback attributes on comments model', function () {
        const component = this.subject();

        setupState(component);
        component[method]();

        expect(commentMock.rollbackAttributes.called).to.be.true;
      });

      it('should call flash message with correct params', function () {
        const component = this.subject();

        setupState(component);
        component[method]();

        expect(spy.calledWith('There was problem while updating your comment.', 'warning')).to.be.true;
      });
    });
  });
});
