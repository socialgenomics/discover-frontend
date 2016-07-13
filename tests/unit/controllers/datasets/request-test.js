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
    needs: [
      'service:session',
      'service:metrics',
      'ember-validations@validator:local/presence'
    ]
  },
  function() {
    it('exists', function() {
      let controller = this.subject();
      expect(controller).to.be.ok;
    });
  }
);
