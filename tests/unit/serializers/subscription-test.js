import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupModelTest } from 'ember-mocha';

describe('Unit | Serializer | subscription', function() {
  setupModelTest('subscription', {
    // Specify the other units that are required for this test.
    needs: [
      'serializer:subscription',
      'model:user',
      'model:notification',
      'model:dataset',
      'model:request'
    ]
  });

  describe('on serialization', function() {
    it('serialized subscription has correct keys', function() {
      const record = this.subject();
      const serializedRecord = record.serialize();

      expect('active' in serializedRecord).to.be.true;
      expect('subscribable_id' in serializedRecord).to.be.true;
      expect('subscribable_model' in serializedRecord).to.be.true;
      expect('user_id' in serializedRecord).to.be.true;
    });
  });
});
