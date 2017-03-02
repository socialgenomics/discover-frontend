import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupTest } from 'ember-mocha';
import Ember from 'ember';
import CheckEditPermissionsMixinMixin from 'repositive/mixins/check-edit-permissions-mixin';

describe('Unit | Mixin | check edit permissions mixin', function() {
  const { set, get, Service, getOwner } = Ember;
  const id = '123';
  const altId = '456';
  const authenticatedUser = { id };
  const sessionServiceStub = Service.extend({ authenticatedUser });

  let mixinObjInstance;

  setupTest('mixin:search', {
    subject() {
      const CheckEditPermissionsMixinMixinObj = Ember.Object.extend(CheckEditPermissionsMixinMixin);

      this.register('test-container:CheckEditPermissionsMixinMixinObj', CheckEditPermissionsMixinMixinObj);
      this.register('service:session', sessionServiceStub);
      this.inject.service('session', { as: 'session' });

      return getOwner(this).lookup('test-container:CheckEditPermissionsMixinMixinObj');
    }
  });

  beforeEach(function () {
    mixinObjInstance = this.subject();
  });

  describe('computed properties', function () {
    describe('canEdit', function () {
      const prop = this.title;

      function createModel(userId) {
        return { userId: { id: userId } };
      }

      it('returns true', function () {
        set(mixinObjInstance, 'checkEditPermissionsModel', createModel(id));
        expect(get(mixinObjInstance, prop)).to.be.true;
      });

      it('returns false if user id doesn\'t match with author id', function () {
        set(mixinObjInstance, 'checkEditPermissionsModel', createModel(altId));
        expect(get(mixinObjInstance, prop)).to.be.false;
      });

      it('returns false if user is not logged in', function () {
        authenticatedUser.id = altId;
        set(mixinObjInstance, 'checkEditPermissionsModel', createModel(id));
        expect(get(mixinObjInstance, prop)).to.be.false;
      });
    });
  });
});
