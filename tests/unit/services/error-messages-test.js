import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupTest } from 'ember-mocha';

describe('Unit | Service | error messages', function() {
  setupTest('service:error-messages', {
    // Specify the other units that are required for this test.
    needs: ['service:i18n']
  });

  // Replace this with your real tests.
  it('exists', function() {
    let service = this.subject();
    expect(service).to.be.ok;
  });
});
