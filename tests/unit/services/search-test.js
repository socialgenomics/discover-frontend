/* jshint expr:true */
import { expect } from 'chai';
import { it, describe } from 'mocha';
import { setupTest } from 'ember-mocha';

describe('SearchService', function() {
  setupTest('service:search', {
    needs: [
      'service:ajax',
      'service:session',
      'service:metrics'
    ]
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
    expect(newTree.left.text).to.eql(tree.right.left.text);
  });
});
