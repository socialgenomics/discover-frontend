/* jshint expr:true */
import { expect } from 'chai';
import {
  describeModule,
  it
} from 'ember-mocha';

describeModule(
  'service:search',
  'SearchService',
  {
    // Specify the other units that are required for this test.
    // needs: ['service:foo']
    needs: [
      'service:ajax',
      'service:session',
      'service:metrics'
    ]
  },
  function() {
    // Replace this with your real tests.
    it('exists', function() {
      let service = this.subject();
      expect(service).to.be.ok;
    });

    it('Adds filters', function () {
      let service = this.subject();
      // Add a query
      service.updateQuery('cancer AND breast');
      let string = service.getQueryString();
      expect(string).to.eql('(cancer AND breast)');
      service.addPredicate('assay', 'RNA-Seq');
      string = service.getQueryString();
      expect(string).to.eql('(assay:RNA-Seq AND (cancer AND breast))');
    });
  }
);
