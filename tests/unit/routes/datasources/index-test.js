/* jshint expr:true */
import { expect } from 'chai';
import {
  describeModule,
  it
} from 'ember-mocha';

describeModule(
  'route:datasources/index',
  'DatasourcesRoute',
  {
    // Specify the other units that are required for this test.
    needs: [
      'service:session',
      'service:metrics'
    ]
  },
  function() {
    it('exists', function() {
      let route = this.subject();
      expect(route).to.be.ok;
    });
  }
);
