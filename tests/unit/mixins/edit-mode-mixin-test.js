import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupTest } from 'ember-mocha';
import Ember from 'ember';
import EditModeMixin from 'repositive/mixins/edit-mode-mixin';
import sinon from 'sinon';


describe('Unit | Mixin | edit mode mixin', function() {
  const { set, get, getOwner, setProperties, getProperties } = Ember;
  const spy = sinon.spy();
  const props = { a: 'a', b: 'b', c: 'c' };
  const objName = 'obj';
  const keys = ['a', 'b', 'c'];

  let mixinObjInstance;

  setupTest('mixin:edit-mode-mixin', {
    subject() {
      const EditModeMixinObj = Ember.Object.extend(EditModeMixin, {
        _addFlashMessage: spy
      });

      this.register('test-container:EditModeMixinObj', EditModeMixinObj);

      return getOwner(this).lookup('test-container:EditModeMixinObj');
    }
  });

  beforeEach(function () {
    spy.reset();
    mixinObjInstance = this.subject();
  });

  describe('resetModuleStateOnCancel', function () {
    const method = this.title;

    it('should set correct state on the module', function () {
      setProperties(mixinObjInstance, {
        inEditMode: true,
        [objName]: props,
        a: 'A',
        b: 'B',
        c: 'C'
      });

      mixinObjInstance[method](objName, keys);
      expect(getProperties(mixinObjInstance, 'a', 'b', 'c')).to.eql(props);
    });
  });

  describe('saveChanges', function () {
    const method = this.title;

    beforeEach(function () {
      setProperties(mixinObjInstance, Ember.merge({ persistChanges: sinon.spy() }, props));
    });

    it('should set correct properties on model', function () {
      const modelMock = {};

      mixinObjInstance[method](modelMock, keys);
      expect(modelMock).to.eql(props);
    });

    it('should persist changes', function () {
      const modelMock = {};

      mixinObjInstance[method](modelMock, keys);
      expect(mixinObjInstance.persistChanges.calledOnce).to.be.true;
    });
  });

  describe('persistChanges', function () {
    const method = this.title;

    beforeEach(function () {
      setProperties(mixinObjInstance, {
        _onEditSuccess: sinon.spy(),
        _onEditError: sinon.spy()
      });
    });

    it('should call _onEditSuccess on success', function (done) {
      const model = { save() { return Ember.RSVP.resolve(); } };

      mixinObjInstance[method](model);

      setTimeout(() => {
        expect(mixinObjInstance._onEditSuccess.called).to.be.true;
        done();
      }, 0);
    });

    it('should call _onEditError on fail', function (done) {
      const model = { save() { return Ember.RSVP.reject(); } };

      mixinObjInstance[method](model);

      setTimeout(() => {
        expect(mixinObjInstance._onEditError.calledWith(model)).to.be.true;
        done();
      }, 0);
    });
  });

  describe('_createDataModel', function () {
    const method = this.title;

    it('should return object with subset of properties from module', function () {
      setProperties(mixinObjInstance, props);

      expect(mixinObjInstance[method](keys)).to.eql(props);
    });

    it('should return object with subset of properties from child object of module', function () {
      set(mixinObjInstance, objName, props);

      expect(mixinObjInstance[method](keys, objName)).to.eql(props);
    });
  });

  describe('_onEditSuccess', function () {
    const method = this.title;

    beforeEach(function () {
      set(mixinObjInstance, 'inEditMode', true);
    });

    it('should set "inEditMode" to false', function () {
      mixinObjInstance[method]();

      expect(get(mixinObjInstance, 'inEditMode')).to.be.false;
    });

    it('should call flash message with correct params', function () {
      mixinObjInstance[method]();

      expect(spy.calledWith('Your changes have been saved.', 'success')).to.be.true;
    });
  });

  describe('_onEditError', function () {
    const method = this.title;
    const modelMock = { rollbackAttributes: sinon.spy() };

    beforeEach(function () {
      set(mixinObjInstance, 'inEditMode', true);
      modelMock.rollbackAttributes.reset();
    });

    it('should set "inEditMode" to false', function () {
      mixinObjInstance[method](modelMock);

      expect(get(mixinObjInstance, 'inEditMode')).to.be.false;
    });

    it('should rollback attributes on comments model', function () {
      mixinObjInstance[method](modelMock);

      expect(modelMock.rollbackAttributes.called).to.be.true;
    });

    it('should call flash message with correct params', function () {
      mixinObjInstance[method](modelMock);

      expect(spy.calledWith('There was a problem while saving your changes.', 'warning')).to.be.true;
    });
  });
});
