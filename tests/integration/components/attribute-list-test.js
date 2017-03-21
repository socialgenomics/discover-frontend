import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

const getMockAttributeAction = () => {
  return {
    id: '1',
    properties: {
      key: 'assay',
      value: 'ABC'
    },
    userId: {
      id: '2'
    }
  };
};

const getMockDatasetAttributes = () => {
  return {
    assay: ['DEF', 'XYZ'],
    samples: ['23'],
    tissue: ['heart'],
    technology: ['ZX Spectrum'],
    pmid: ['123']
  }
}

describe('Integration | Component | attributes list', function() {
  setupComponentTest('attribute-list', {
    integration: true
  });

  describe('Attribute keys', function() {
    it('renders a list of keys', function() {
      this.set('attributeActions', [getMockAttributeAction()]);
      this.render(hbs`{{attribute-list attributeActions=attributeActions}}`);
      expect(this.$('h3').first().text().trim()).to.eql('Assay');
      expect(this.$('h3:eq(1)').text().trim()).to.eql('Samples');
      expect(this.$('h3:eq(2)').text().trim()).to.eql('Tissue');
      expect(this.$('h3:eq(3)').text().trim()).to.eql('Technology');
      expect(this.$('h3').last().text().trim()).to.eql('Pubmed ID');
    });
  });

  describe('Attribute values', function() {
    it('renders an empty list when there are no attributes', function() {
      this.setProperties({
        'attributeActions': [],
        'attributesFromDataset': {}
      });
      this.render(hbs`{{attribute-list
        attributeActions=attributeActions
        attributesFromDataset=attributesFromDataset}}`);
      expect(this.$('p').first().text().trim()).to.be.empty;
    });

    it('renders list of user attrs when there are no dataset attrs', function() {
      this.setProperties({
        'attributeActions': [getMockAttributeAction()],
        'attributesFromDataset': {}
      });
      this.render(hbs`{{attribute-list
        attributeActions=attributeActions
        attributesFromDataset=attributesFromDataset}}`);
      expect(this.$('p').first().text().trim()).to.eql('ABC');
    });

    it('renders list of dataset attrs when there are no user attrs', function() {
      this.setProperties({
        'attributeActions': [],
        'attributesFromDataset': getMockDatasetAttributes()
      });
      this.render(hbs`{{attribute-list
        attributeActions=attributeActions
        attributesFromDataset=attributesFromDataset}}`);
      expect(this.$('p').first().text().trim()).to.eql('DEF');
      expect(this.$('p:eq(1)').text().trim()).to.eql('XYZ');
    });

    it('renders a list of dataset attrs and user added attrs', function() {
      this.setProperties({
        'attributeActions': [getMockAttributeAction()],
        'attributesFromDataset': getMockDatasetAttributes()
      })
      this.render(hbs`{{attribute-list
        attributeActions=attributeActions
        attributesFromDataset=attributesFromDataset}}`);
      expect(this.$('p').first().text().trim()).to.eql('ABC');
      expect(this.$('p:eq(1)').text().trim()).to.eql('DEF');
      expect(this.$('p:eq(2)').text().trim()).to.eql('XYZ');
    });
  });

  describe('actions', function() {
    it('clicking add attribute opens input form', function() {
      this.set('attributeActions', [getMockAttributeAction()]);
      this.render(hbs`{{attribute-list attributeActions=attributeActions}}`);
      this.$('span').click();
      expect(this.$('input').attr('placeholder')).to.eql('Add an attribute');
      expect(this.$('button').first().text().trim()).to.eql('Add');
      expect(this.$('button:eq(1)').text().trim()).to.eql('Cancel');
    });
  });
});
