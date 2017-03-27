import { expect } from 'chai';
import { describe, it, beforeEach } from 'mocha';
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


  describe('Add attribute trigger', function() {
    describe('trigger for attribute which can only have 1 value', function() {
      it('should be visible if the attribute has no value', function() {
        this.setProperties({
          'attributeActions': [],
          'attributesFromDataset': {}
        });
        this.render(hbs`{{attribute-list
          attributeActions=attributeActions
          attributesFromDataset=attributesFromDataset}}`);
        expect(this.$('.t-add-trigger:eq(1)').text().trim()).to.eql('Add Samples');
      });

      it('should not be visible the attribute has a value', function() {
        this.setProperties({
          'attributeActions': [],
          'attributesFromDataset': {
            samples: ['23']
          }
        });
        this.render(hbs`{{attribute-list
          attributeActions=attributeActions
          attributesFromDataset=attributesFromDataset}}`);
        expect(this.$('.t-add-trigger:eq(1)').text().trim()).to.eql('Add Tissue');
      });
    });

    describe('trigger for attribute which can have multiple values', function() {
      it('should be visible regardless of current values', function() {
        this.setProperties({
          'attributeActions': [getMockAttributeAction()],
          'attributesFromDataset': {
            assay: ['123', '456']
          }
        });
        this.render(hbs`{{attribute-list
          attributeActions=attributeActions
          attributesFromDataset=attributesFromDataset}}`);
        expect(this.$('.t-add-trigger:eq(0)').text().trim()).to.eql('Add Assay');
      });
    });
  });


  describe('actions', function() {
    it('clicking add attribute opens input form', function() {
      this.set('attributeActions', [getMockAttributeAction()]);
      this.render(hbs`{{attribute-list attributeActions=attributeActions}}`);
      this.$('.t-add-trigger').click();
      expect(this.$('input').attr('placeholder')).to.eql('Add an attribute');
      expect(this.$('input').val()).to.be.empty;
      expect(this.$('button').first().text().trim()).to.eql('Add');
      expect(this.$('button:eq(1)').text().trim()).to.eql('Cancel');
    });

    describe('cancel', function() {
      beforeEach(function() {
        this.set('attributeActions', [getMockAttributeAction()]);
        this.render(hbs`{{attribute-list attributeActions=attributeActions}}`);
        this.$('.t-add-trigger').click();
      });

      it('closes the form', function() {
        expect(this.$('button:eq(1)').text().trim()).to.eql('Cancel');
        this.$('button:eq(1)').click();
        expect(this.$('button:eq(1)').text().trim()).to.be.empty;
      });

      it('input state is reset', function() {
        this.$('input').val('Should disappear');
        expect(this.$('input').val()).to.eql('Should disappear');
        this.$('button:eq(1)').click(); //cancel
        this.$('.t-add-trigger').click();
        expect(this.$('input').val()).to.be.empty;
      });
    });
  });
});
