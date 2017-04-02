import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';
import sinon from 'sinon';

describe('Integration | Component | user profile avatar upload', function() {
  const avatarImg = 'foo.jpg';
  const reloadUserModel = () => sinon.spy();
  const overlayTextSelector = '.c-avatar-upload__hover__text';
  const overlaySelector = '.c-avatar-upload__hover';

  setupComponentTest('user-profile-avatar-upload', {
    integration: true
  });

  describe('default state', function () {
    it('should not show text over avatar', function () {
      this.setProperties({ avatarImg, reloadUserModel });
      this.render(hbs`{{user-profile-avatar-upload avatarImg=avatarImg reloadUserModel=reloadUserModel}}`);

      const $hoverText = this.$(overlayTextSelector);

      expect($hoverText.is(':hidden')).to.be.equal(true);
      expect($hoverText.hasClass('u-hide-display')).to.be.equal(true);
    });

    it('should have correct text in overlay', function () {
      this.setProperties({ avatarImg, reloadUserModel });
      this.render(hbs`{{user-profile-avatar-upload avatarImg=avatarImg reloadUserModel=reloadUserModel}}`);

      expect(this.$(overlayTextSelector).text().trim()).to.be.equal('Edit photo');
    });

    it('should not show color overlay', function () {
      this.setProperties({ avatarImg, reloadUserModel });
      this.render(hbs`{{user-profile-avatar-upload avatarImg=avatarImg reloadUserModel=reloadUserModel}}`);

      const $overlay = this.$(overlaySelector);

      expect($overlay.hasClass('u-hv-bc-darken40')).to.be.equal(true);
      expect($overlay.hasClass('u-bc-dark-overlay')).to.be.equal(false);
    });
  });

  describe('uploading state', function () {
    it('should  show text over avatar', function () {
      this.setProperties({ avatarImg, reloadUserModel, uploading: true });
      this.render(hbs`{{user-profile-avatar-upload avatarImg=avatarImg reloadUserModel=reloadUserModel uploading=uploading}}`);

      const $hoverText = this.$(overlayTextSelector);

      expect($hoverText.is(':visible')).to.be.equal(true);
      expect($hoverText.hasClass('u-hide-display')).to.be.equal(false);
    });

    it('should have correct text in overlay', function () {
      this.setProperties({ avatarImg, reloadUserModel, uploading: true });
      this.render(hbs`{{user-profile-avatar-upload avatarImg=avatarImg reloadUserModel=reloadUserModel uploading=uploading}}`);

      expect(this.$(overlayTextSelector).text().trim()).to.be.equal('Uploading...');
    });

    it('should show  color overlay', function () {
      this.setProperties({ avatarImg, reloadUserModel, uploading: true });
      this.render(hbs`{{user-profile-avatar-upload avatarImg=avatarImg reloadUserModel=reloadUserModel uploading=uploading}}`);

      const $overlay = this.$(overlaySelector);

      expect($overlay.hasClass('u-hv-bc-darken40')).to.be.equal(false);
      expect($overlay.hasClass('u-bc-dark-overlay')).to.be.equal(true);
    });
  });
});
