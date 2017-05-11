import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';
import sinon from 'sinon';

describe('Integration | Component | user profile avatar upload', function() {
  const avatarImg = 'foo.jpg';
  const reloadUserModel = () => sinon.spy();

  setupComponentTest('user-profile-avatar-upload', {
    integration: true
  });

  describe('default state', function () {
    it('image wrapper should have correct text as data-attr', function () {
      this.setProperties({ avatarImg, reloadUserModel });
      this.render(hbs`{{user-profile-avatar-upload avatarImg=avatarImg reloadUserModel=reloadUserModel}}`);

      const $imageWrapper = this.$('.c-avatar-upload__image-wrapper');

      expect($imageWrapper.attr('class')).to.eql('Edit photo'));
    });

    it('should not show error messages', function () {
      this.setProperties({ avatarImg, reloadUserModel });
      this.render(hbs`{{user-profile-avatar-upload avatarImg=avatarImg reloadUserModel=reloadUserModel}}`);

      expect(this.$('p.fc-red').text().trim()).to.be.equal('');
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

      expect(this.$('p.fc-red').text().trim()).to.be.equal('');
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

      expect(this.$('p.fc-red').text().trim()).to.be.equal('Something went wrong while uploading your image.Please try again later.');
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

      expect(this.$('p.fc-red').text().trim()).to.be.equal('Something went wrong while uploading your image.Your avatar will be displayed soon.');
    });
  });
});
