import { describe, it, beforeEach, afterEach } from 'mocha';
import { expect } from 'chai';
import startApp from 'repositive/tests/helpers/start-app';
import destroyApp from 'repositive/tests/helpers/destroy-app';

describe('!T Acceptance | getting help', function() {
  let application;

  beforeEach(function() {
    application = startApp();
  });

  afterEach(function() {
    destroyApp(application);
  });

  it('can visit /', function() {
    visit('/help/your-account/access');

    return andThen(() => {
      expect(currentURL()).to.equal('/help/your-account/access');
    });
  });
});
