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

    it('should not show error messages', function () {
      this.setProperties({ avatarImg, reloadUserModel });
      this.render(hbs`{{user-profile-avatar-upload avatarImg=avatarImg reloadUserModel=reloadUserModel}}`);

      expect(this.$('p.u-tc-red').text().trim()).to.be.equal('');
    });
  });

  describe('uploading state', function () {
    it('should show spinner', function () {
      this.setProperties({ avatarImg, reloadUserModel });
      this.render(hbs`{{user-profile-avatar-upload avatarImg=avatarImg reloadUserModel=reloadUserModel uploading=true}}`);

      expect(this.$('.fa-refresh').length).to.be.equal(1);
    });

    it('should not show error messages', function () {
      this.setProperties({ avatarImg, reloadUserModel });
      this.render(hbs`{{user-profile-avatar-upload avatarImg=avatarImg reloadUserModel=reloadUserModel uploading=true}}`);

      expect(this.$('p.u-tc-red').text().trim()).to.be.equal('');
    });
  });

  describe('upload failed', function () {
    it('should show error indicator', function () {
      this.setProperties({ avatarImg, reloadUserModel });
      this.render(hbs`{{user-profile-avatar-upload avatarImg=avatarImg reloadUserModel=reloadUserModel uploadFailed=true}}`);

      expect(this.$('.fa-times').length).to.be.equal(1);
      expect(this.$('.error-state').text().trim()).to.be.equal('Upload failed');
    });

    it('should show error messages', function () {
      this.setProperties({ avatarImg, reloadUserModel });
      this.render(hbs`{{user-profile-avatar-upload avatarImg=avatarImg reloadUserModel=reloadUserModel uploadFailed=true}}`);

      expect(this.$('p.u-tc-red').text().trim()).to.be.equal('Same issues has occurred.Please try again later.');
    });
  });

  describe('reload model failed', function () {
    it('should show error indicator', function () {
      this.setProperties({ avatarImg, reloadUserModel });
      this.render(hbs`{{user-profile-avatar-upload avatarImg=avatarImg reloadUserModel=reloadUserModel reloadFailed=true}}`);

      expect(this.$('.fa-check').length).to.be.equal(1);
      expect(this.$('.error-state').text().trim()).to.be.equal('Image uploaded');
    });

    it('should  show error messages', function () {
      this.setProperties({ avatarImg, reloadUserModel });
      this.render(hbs`{{user-profile-avatar-upload avatarImg=avatarImg reloadUserModel=reloadUserModel reloadFailed=true}}`);

      expect(this.$('p.u-tc-red').text().trim()).to.be.equal('Same issues has occurred.Your photo will be displayed soon.');
    });
  });
});
