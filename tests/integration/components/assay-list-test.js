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
      this.set('assays', ['ABC', 'DEF']);
      this.render(hbs`{{assay-list assays=assays}}`);
      const $assayBlocks = this.$('span');
      expect(this.$('li').children('span').length).to.eql(2);
      expect($assayBlocks.first().attr('data-balloon')).to.eql('ABC');
      expect($assayBlocks.last().attr('data-balloon')).to.eql('DEF');
    });

    it('renders at most 4 assays', function() {
      this.set('assays', ['ABC', 'DEF', 'GHI', 'JKL', 'MLN']);
      this.render(hbs`{{assay-list assays=assays}}`);
      expect(this.$('li').children('span').length).to.eql(4);
    });
  });
});
