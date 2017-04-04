import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describe('Integration | Component | assay list', function() {
  setupComponentTest('assay-list', {
    integration: true
  });

  describe('given a list of propertiesAssays', function() {
    it('renders each assay', function() {
      this.set('propertiesAssays', ['ABC', 'DEF']);
      this.render(hbs`{{assay-list datasetAssays=datasetAssays propertiesAssays=propertiesAssays}}`);
      expect(this.$('li').children('span').length).to.eql(2);
      expect(this.$('span:eq(0)').attr('data-balloon')).to.eql('ABC');
      expect(this.$('span:eq(1)').attr('data-balloon')).to.eql('DEF');
    });

    it('renders at most 4 assays', function() {
      this.set('propertiesAssays', ['ABC', 'DEF', 'GHI', 'JKL', 'MLN']);
      this.render(hbs`{{assay-list datasetAssays=datasetAssays propertiesAssays=propertiesAssays}}`);
      expect(this.$('li').children('span').length).to.eql(4);
      expect(this.$('span:eq(0)').attr('data-balloon')).to.eql('ABC');
      expect(this.$('span:eq(1)').attr('data-balloon')).to.eql('DEF');
      expect(this.$('span:eq(2)').attr('data-balloon')).to.eql('GHI');
      expect(this.$('span:eq(3)').attr('data-balloon')).to.eql('JKL');
    });
  });

  describe('given a list of datasetAssays', function() {
    it('renders datasetAssays when there are no propertiesAssays', function() {
      this.set('datasetAssays', 'XYZ,123');
      this.render(hbs`{{assay-list datasetAssays=datasetAssays}}`);
      expect(this.$('li').children('span').length).to.eql(2);
      expect(this.$('span:eq(0)').attr('data-balloon')).to.eql('XYZ');
      expect(this.$('span:eq(1)').attr('data-balloon')).to.eql('123');
    });

    it('renders at most 4 assays', function() {
      this.set('datasetAssays', 'ABC,123,456,789,XYZ');
      this.render(hbs`{{assay-list datasetAssays=datasetAssays}}`);
      expect(this.$('li').children('span').length).to.eql(4);
      expect(this.$('span:eq(0)').attr('data-balloon')).to.eql('ABC');
      expect(this.$('span:eq(1)').attr('data-balloon')).to.eql('123');
      expect(this.$('span:eq(2)').attr('data-balloon')).to.eql('456');
      expect(this.$('span:eq(3)').attr('data-balloon')).to.eql('789');
    });
  });

  describe('given a list of propertiesAssays and datasetAssays', function() {
    it('renders only the propertiesAssays', function() {
      this.setProperties({
        'datasetAssays': 'XYZ,123',
        'propertiesAssays': ['ABC', 'DEF']
      });
      this.render(hbs`{{assay-list datasetAssays=datasetAssays propertiesAssays=propertiesAssays}}`);
      expect(this.$('li').children('span').length).to.eql(2);
      expect(this.$('span:eq(0)').attr('data-balloon')).to.eql('ABC');
      expect(this.$('span:eq(1)').attr('data-balloon')).to.eql('DEF');
    })
  });
});
