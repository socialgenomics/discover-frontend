import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describe('Integration | Component | user profile details', function() {
  const userId = 'userId';
  const userProfileData = {
    firstname: 'foo',
    lastname: 'bar',
    profile: {
      bio: 'lorem ipsum',
      work_organisation: 'test',
      work_role: 'test123',
      location: 'the net'
    }
  };

  setupComponentTest('user-profile-details', {
    integration: true
  });

  it('should render correct number of form fields', function() {
    this.setProperties({ userId, userProfileData });

    this.render(hbs`{{user-profile-details userId=userId userProfileData=userProfileData}}`);

    expect(this.$('.c-validated-input')).to.have.length(6);
    expect(this.$('input')).to.have.length(5);
    expect(this.$('textarea')).to.have.length(1);
  });

  it('should set correct labels on form fields', function () {
    this.setProperties({ userId, userProfileData });

    this.render(hbs`{{user-profile-details userId=userId userProfileData=userProfileData}}`);

    const $labels = this.$('label');

    expect($labels).to.have.length(6);
    expect($labels.eq(0).text().trim()).to.be.equal('Short Bio (max 250 characters)');
    expect($labels.eq(1).text().trim()).to.be.equal('First Name');
    expect($labels.eq(2).text().trim()).to.be.equal('Last Name');
    expect($labels.eq(3).text().trim()).to.be.equal('Affiliation');
    expect($labels.eq(4).text().trim()).to.be.equal('Job Role');
    expect($labels.eq(5).text().trim()).to.be.equal('Location');
  });

  it('should pass correct values to form fields', function () {
    this.setProperties({ userId, userProfileData });

    this.render(hbs`{{user-profile-details userId=userId userProfileData=userProfileData}}`);

    const $formItems = this.$('input, textarea');
    expect($formItems).to.have.length(6);
    expect($formItems.eq(0).val().trim()).to.be.equal(userProfileData.profile.bio);
    expect($formItems.eq(1).val().trim()).to.be.equal(userProfileData.firstname);
    expect($formItems.eq(2).val().trim()).to.be.equal(userProfileData.lastname);
    expect($formItems.eq(3).val().trim()).to.be.equal(userProfileData.profile.work_organisation);
    expect($formItems.eq(4).val().trim()).to.be.equal(userProfileData.profile.work_role);
    expect($formItems.eq(5).val().trim()).to.be.equal(userProfileData.profile.location);
  });

  it('should set correct placeholders on form fields', function () {
    this.setProperties({ userId, userProfileData });

    this.render(hbs`{{user-profile-details userId=userId userProfileData=userProfileData}}`);

    const $formItems = this.$('input, textarea');
    expect($formItems).to.have.length(6);
    expect($formItems.eq(0).attr('placeholder')).to.be.equal('Tell us a bit more what are you working on.');
    expect($formItems.eq(1).attr('placeholder')).to.be.equal('e.g. Christina');
    expect($formItems.eq(2).attr('placeholder')).to.be.equal('e.g. Luckasson');
    expect($formItems.eq(3).attr('placeholder')).to.be.equal('e.g. Bioinformatician at XYZ Institute');
    expect($formItems.eq(4).attr('placeholder')).to.be.equal('e.g. Postdoctoral Researcher');
    expect($formItems.eq(5).attr('placeholder')).to.be.equal('e.g. Cambridge, UK');
  });
});
