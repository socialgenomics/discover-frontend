import { expect } from 'chai';
import { describe, it, beforeEach } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

const interests =  ['foo', 'bar'];

describe('Integration | Component | user profile interests', function() {
  setupComponentTest('user-profile-interests', {
    integration: true
  });

  beforeEach(function () {
    this.setProperties({
      userId: 1,
      interests
    });

    this.render(hbs`{{user-profile-interests userId=userId interests=interests}}`);
  });

  describe('interests list', function () {
    it('should render interests', function () {
      const $interest = this.$('.t-tag-item');

      expect($interest).to.have.length(interests.length);
      expect($interest.eq(0).text().trim()).to.be.equal(interests[0]);
      expect($interest.eq(1).text().trim()).to.be.equal(interests[1]);
    });
  });
});
