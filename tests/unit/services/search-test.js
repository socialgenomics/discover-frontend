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
    needs: [
      'service:ajax',
      'service:session',
      'service:metrics'
    ]
  },
  function() {
    it('exists', function() {
      let service = this.subject();
      expect(service).to.be.ok;
    });

    it('Adds filters', function () {
      let service = this.subject();
      // Add a query
      service.updateQuery('cancer AND breast');
      const original = service.getQueryString();
      expect(original).to.eql('(cancer AND breast)');
      service.addPredicate('assay', 'RNA-Seq');
      const newString = service.getQueryString();
      expect(newString).to.eql('(assay:RNA-Seq AND (cancer AND breast))');
    });

    it('removes filters', function () {
      let service = this.subject();
      // Add a query
      const original = '(assay:RNA-Seq AND (cancer AND breast))';
      service.updateQuery(original);
      service.removePredicate('assay', 'TEST');
      expect(service.getQueryString()).to.eql(original);
      service.removePredicate('assay', 'RNA-Seq');
      const removed = service.getQueryString();
      expect(removed).to.not.eql(original);
      expect(removed).to.eql('(cancer AND breast)');
    });
  }
);
