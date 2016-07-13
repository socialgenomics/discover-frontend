/* jshint expr:true */
import { expect } from 'chai';
import {
  describeModule,
  it
} from 'ember-mocha';

describeModule(
  'controller:datasets/request',
  'DatasetsRequestController',
  {
    // Specify the other units that are required for this test.
    needs: [
      'service:session',
      'service:metrics',
      'ember-validations@validator:local/presence',
    ]
  },
  function() {
    // Replace this with your real tests.
    it('exists', function() {
      let controller = this.subject();
      expect(controller).to.be.ok;
    });
  }
);
