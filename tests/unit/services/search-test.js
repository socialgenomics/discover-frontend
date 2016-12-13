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

    it('addFilter returns a new queryString with the filter appended', function () {
      const service = this.subject();
      const treeWithFilter = service.addFilter('assay', 'RNA-Seq');
      expect(service.serializeToString(treeWithFilter)).to.eql('assay:RNA-Seq');
    });

    it('removeFilter returns a new queryString with the filter deleted', function () {
      const service = this.subject();
      const originalQuery = 'assay:RNA-Seq cancer breast';
      const tree = service.updateQuery(originalQuery);
      expect(service.removeFilter('assay', 'TEST')).to.eql(tree);
      const newTree = service.removeFilter('assay', 'RNA-Seq');
      expect(newTree.left.text).to.eql(tree.left.right.text);
    });
  }
);
