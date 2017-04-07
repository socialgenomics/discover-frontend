import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupTest } from 'ember-mocha';

describe('Unit | Controller | datasets/detail', function() {
  setupTest('controller:datasets/detail', {
    // Specify the other units that are required for this test.
    needs: [
      'service:metrics',
      'service:session'
    ]
  });

  // TODO will unit test all breakable methods.
  it('exists', function() {
    let controller = this.subject();
    expect(controller).to.be.ok;
  });
});
