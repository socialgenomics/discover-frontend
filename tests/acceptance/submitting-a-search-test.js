import { describe, it, beforeEach, afterEach } from 'mocha';
import { expect } from 'chai';
import startApp from 'repositive/tests/helpers/start-app';
import destroyApp from 'repositive/tests/helpers/destroy-app';

describe('Acceptance | submitting a search', function() {
  let application;

  beforeEach(function() {
    application = startApp();
  });

  afterEach(function() {
    destroyApp(application);
  });

  it('can visit /submitting-a-search', function() {
    visit('/submitting-a-search');

    return andThen(() => {
      expect(currentURL()).to.equal('/submitting-a-search');
    });
  });
});
