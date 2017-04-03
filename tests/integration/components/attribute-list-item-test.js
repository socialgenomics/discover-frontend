import { expect } from 'chai';
import { describe, beforeEach, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describe('Integration | Component | attribute list item', function() {
  setupComponentTest('attribute-list-item', {
    integration: true
  });

  describe('when the key is pubmed id', function() {
    beforeEach(function() {
      const attr = {
        key: 'pmid',
        value: '123'
      };
      this.set('attribute', attr);
      this.render(hbs`{{attribute-list-item attribute=attribute}}`);
    });

    it('the pubmedid should be rendered as a link', function() {
      expect(this.$('a').text().trim()).to.eql('123');
      expect(this.$('a').attr('href')).to.eql('https://www.ncbi.nlm.nih.gov/pubmed/123');
    });
  });
});
