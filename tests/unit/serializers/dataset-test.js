/* jshint expr:true */
import { expect } from 'chai';
import { describeModel, it } from 'ember-mocha';

describeModel(
  'dataset',
  'Unit | Serializer | dataset',
  {
    // Specify the other units that are required for this test.
    needs: [
      'serializer:dataset',
      'model:actionable',
      'model:collection',
      'model:highlight',
      'model:user',
      'transform:isodate',
      'transform:object'
    ]
  },
  function() {
    // Replace this with your real tests.
    it('serializes records', function() {
      let record = this.subject();

      let serializedRecord = record.serialize();

      expect(serializedRecord).to.be.ok;
    });
  }
);
