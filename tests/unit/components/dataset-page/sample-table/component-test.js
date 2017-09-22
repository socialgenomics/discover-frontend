import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';

describe('Unit | Component | dataset page/sample table', function() {
  setupComponentTest('dataset-page/sample-table', {
    unit: true
  });

  const samples = [
    { title: 'abc', 'Sample ID': '1', url: 'abc.com' }
  ];

  describe('toHTML', function() {
    it('returns an html table with human readable headers', function() {
      let component = this.subject();
      component.set('samples', samples);
      const result = component.get('table').trim();
      expect(result.includes('<th>Title</th>')).to.be.true;
      expect(result.includes('<th>Sample ID</th>')).to.be.true;
      expect(result.includes('<th>Url</th>')).to.be.false;
    });

    it('sample id links to the sample website', function() {
      let component = this.subject();
      component.set('samples', samples);
      const result = component.get('table').trim();
      expect(result.includes(`<a href=abc.com target='_blank'>1</a>`)).to.be.true;
    })
  });
});
