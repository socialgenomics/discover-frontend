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

  it('exists', function() {
    let service = this.subject();
    expect(service).to.be.ok;
  });

  it('addFilter returns a new queryString with the filter appended', function () {
    const service = this.subject();
    const queryStringWithFilter = service.addFilter('assay', 'RNA-Seq');
    expect(queryStringWithFilter).to.eql('assay:RNA-Seq');
  });

  it('removeFilter returns a new queryString with the filter deleted', function () {
    const service = this.subject();
    const originalQuery = 'assay:RNA-Seq cancer breast';
    service._updateQuery(originalQuery);
    expect(service.removeFilter('assay', 'TEST')).to.eql(service.getQueryString());
    expect(service.removeFilter('assay', 'RNA-Seq')).to.eql('cancer breast');
  });
});
