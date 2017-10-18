import { describe, it, beforeEach, afterEach } from 'mocha';
import { expect } from 'chai';
import startApp from 'repositive/tests/helpers/start-app';
import destroyApp from 'repositive/tests/helpers/destroy-app';

describe('Acceptance | getting help', function() {
  let application;

  beforeEach(function() {
    application = startApp();
  });

  afterEach(function() {
    destroyApp(application);
  });

  it('can visit help when not logged in', function() {
    visit('/help/your-account/access');

    andThen(() => {
      expect(currentURL()).to.equal('/help/your-account/access');
      expect(find('.t-vertical-menu-heading:first').text().trim()).to.eql('Account')
    });
  });
});
