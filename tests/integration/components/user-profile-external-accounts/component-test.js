import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describe('Integration | Component | user profile external accounts', function() {
  const userId = 'userId';
  const userProfileData = {
    profile: {
      googlePlus: 'http://googlePlus.com',
      linkedIn: 'http://linkedIn.com',
      twitter: '@foobar',
      researchGate: 'http://researchGate.com',
      orcid: 'http://orcid.com'
    }
  };

  setupComponentTest('user-profile-details', {
    integration: true
  });

  it('should render correct number of form fields', function() {
    this.setProperties({ userId, userProfileData });

    this.render(hbs`{{user-profile-external-accounts userId=userId userProfileData=userProfileData}}`);

    expect(this.$('.c-validated-input')).to.have.length(5);
    expect(this.$('input')).to.have.length(5);
  });

  it('should set correct labels on form fields', function () {
    this.setProperties({ userId, userProfileData });

    this.render(hbs`{{user-profile-external-accounts userId=userId userProfileData=userProfileData}}`);

    const $labels = this.$('label');

    expect($labels).to.have.length(5);
    expect($labels.eq(0).text().trim()).to.be.equal('Google+');
    expect($labels.eq(1).text().trim()).to.be.equal('LinkedIn');
    expect($labels.eq(2).text().trim()).to.be.equal('Twitter');
    expect($labels.eq(3).text().trim()).to.be.equal('Research Gate');
    expect($labels.eq(4).text().trim()).to.be.equal('ORCID');
  });

  it('should pass correct values to form fields', function () {
    this.setProperties({ userId, userProfileData });

    this.render(hbs`{{user-profile-external-accounts userId=userId userProfileData=userProfileData}}`);

    const $formItems = this.$('input');

    expect($formItems.eq(0).val().trim()).to.be.equal(userProfileData.profile.googlePlus);
    expect($formItems.eq(1).val().trim()).to.be.equal(userProfileData.profile.linkedIn);
    expect($formItems.eq(2).val().trim()).to.be.equal(userProfileData.profile.twitter);
    expect($formItems.eq(3).val().trim()).to.be.equal(userProfileData.profile.researchGate);
    expect($formItems.eq(4).val().trim()).to.be.equal(userProfileData.profile.orcid);
  });
});
