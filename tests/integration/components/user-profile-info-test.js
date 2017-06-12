import { expect } from 'chai';
import { beforeEach, describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';
import moment from 'moment';

describe('Integration | Component | user profile info', function() {
  const user = {
    displayName: 'ABC 123',
    profile: {
      avatar: 'https://dg2kcfbxc77v1.cloudfront.net/assets/images/avatar/frog-1ee2413df3627d1724a7f26ff7f9fc3a.png',
      bio: 'A short bio',
      location: 'Cambridge',
      work_organisation: 'Repositive',
      work_role: 'Developer'
    },
    verified: true,
    createdAt: moment(new Date('December 17, 1995'))
  };
  setupComponentTest('user-profile-info', {
    integration: true
  });
  describe('when the profile belongs to the current user', function() {
    beforeEach(function() {
      this.setProperties({
        'isOwnProfile': true,
        'user': user
      });
      this.render(hbs`{{user-profile-info
        isOwnProfile=isOwnProfile
        user=user}}`);
    });

    it('edit profile icon is displayed', function() {
      expect(this.$('i').hasClass('fa-pencil')).to.be.true;
    });

    describe('when the user isVerified', function() {
      it('renders verified account badge', function() {
        expect(this.$('h4').text().trim()).to.eql('Verified Account');
      });
    });

    describe('when the user is not verified', function() {
      it('should diplay message telling user to verify account', function() {
        this.set('user.verified', false);
        expect(this.$('h4').text().trim()).to.eql('Please verify your email');
      });
    });

    describe('user has no work_organisation', function() {
      it('renders link to edit profile', function() {
        this.set('user.profile.work_organisation', null);
        expect(this.$('a').eq(0).text().trim()).to.eql('Add where you work');
      });
    });

    describe('user has no work_role', function() {
      it('renders link to edit profile', function() {
        this.set('user.profile.work_role', null);
        expect(this.$('a').eq(1).text().trim()).to.eql('Add your job role');
      });
    });

    describe('user has no bio', function() {
      it('renders link to edit profile', function() {
        this.set('user.profile.bio', null);
        expect(this.$('a').eq(4).text().trim()).to.eql('Add your bio');
      });
    });
  });

  describe('when the profile does not belong to the current user', function() {
    beforeEach(function() {
      this.setProperties({
        'isOwnProfile': false,
        'user': user });
      this.render(hbs`{{user-profile-info
        isOwnProfile=isOwnProfile
        user=user}}`);
    });

    it('edit profile icon is not displayed', function() {
      expect(this.$('i').hasClass('fa-pencil')).to.be.false;
    });
  });

  describe('regardless of current user', function() {
    beforeEach(function() {
      this.setProperties({
        'isOwnProfile': false,
        'user': user});
      this.render(hbs`{{user-profile-info
        isOwnProfile=isOwnProfile
        user=user}}`);
    });

    it('should display the date the user joined', function() {
      expect(this.$('.c-text-with-icon').eq(0).text().trim()).to.eql('Joined December 1995');
    });
  });
});
