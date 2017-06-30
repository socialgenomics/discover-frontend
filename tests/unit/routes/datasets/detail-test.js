import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupTest } from 'ember-mocha';

describe('Unit | Route | datasets/detail', function() {
  setupTest('route:datasets/detail', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });
  describe('setupController', function() {
    it('exists', function() {
      let route = this.subject();
      expect(route).to.be.ok;
    });
  });
});
