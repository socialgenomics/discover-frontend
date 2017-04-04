import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describe('Integration | Component | assay list', function() {
  setupComponentTest('assay-list', {
    integration: true
  });
  describe('given a list of assays', function() {
    it('renders each assay', function() {
      this.set('propertiesAssays', ['ABC', 'DEF']);
      this.render(hbs`{{assay-list datasetAssays=datasetAssays propertiesAssays=propertiesAssays}}`);
      expect(this.$('li').children('span').length).to.eql(2);
      expect(this.$('span:eq(0)').attr('data-balloon')).to.eql('ABC');
      expect(this.$('span:eq(1)').attr('data-balloon')).to.eql('DEF');
    });

    it('renders datasetAssays when there are no propertiesAssays', function() {
      this.set('datasetAssays', 'XYZ,123');
      this.render(hbs`{{assay-list datasetAssays=datasetAssays}}`);
      expect(this.$('li').children('span').length).to.eql(2);
      expect(this.$('span:eq(0)').attr('data-balloon')).to.eql('XYZ');
      expect(this.$('span:eq(1)').attr('data-balloon')).to.eql('123');
    });
  });
});
