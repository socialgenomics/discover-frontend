import { expect } from 'chai';
import { beforeEach, describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';
import sinon from 'sinon';

const values = ['ABC', '2', 'heart', 'Illumia X', '123'];
const keys = ['assay', 'samples', 'tissue', 'technology', 'pmid'];
const keysAsDisplayed = ['Assay', 'Samples', 'Tissue', 'Technology', 'Pubmed ID'];

const getMockAttributes = () => {
  return keys.map((key, i) => {
    return {
      'key': key,
      'value': values[i]
    }
  });
}

describe('Integration | Component | attributes list', function() {
  setupComponentTest('attribute-list', {
    integration: true
  });
  beforeEach(function() {
    this.set('session', {
      isAuthenticated: true
    });
  })

  describe('Attribute keys', function() {
    it('renders a list of keys', function() {
      this.set('attributes', getMockAttributes());
      this.render(hbs`{{attribute-list session=session attributes=attributes}}`);
      const self = this;
      this.$('h3').each(function(i) {
        expect(self.$(this).text().trim()).to.eql(keysAsDisplayed[i]);
      })
    });
  });

  describe('Attribute values', function() {
    it('renders an empty list when there are no attributes', function() {
      this.set('attributes', []);
      this.render(hbs`{{attribute-list session=session attributes=attributes}}`);
      expect(this.$('p.t-attr-item-text').first().text().trim()).to.be.empty;
    });

    it('renders a list of dataset attrs and user added attrs', function() {
      this.set('attributes', getMockAttributes());
      this.render(hbs`{{attribute-list session=session attributes=attributes}}`);
      const self = this;
      this.$('p.t-attr-item-text').each(function(i) {
        expect(self.$(this).text().trim()).to.eql(values[i]);
      })
    });
  });

  describe('Add attribute trigger', function() {
    describe('trigger for attribute which can only have 1 value', function() {
      it('should be visible if the attribute has no value', function() {
        this.set('attributes', []);
        this.render(hbs`{{attribute-list session=session attributes=attributes}}`);
        expect(this.$('.t-add-trigger:eq(1)').text().trim()).to.eql('Add Samples');
      });

      it('should not be visible if the attribute has a value', function() {
        this.set('attributes', getMockAttributes());
        this.render(hbs`{{attribute-list session=session attributes=attributes}}`);
        expect(this.$('.t-add-trigger:eq(1)').text().trim()).to.eql('Add Tissue');
      });
    });

    describe('trigger for attribute which can have multiple values', function() {
      it('should be visible regardless of current values', function() {
        this.set('attributes', getMockAttributes());
        this.render(hbs`{{attribute-list session=session attributes=attributes}}`);
        expect(this.$('.t-add-trigger:eq(0)').text().trim()).to.eql('Add Assay');
      });
    });
  });

  describe('actions', function() {
    beforeEach(function() {
      this.set('attributes', getMockAttributes());
    });

    describe('if unauthenticated', function() {
      beforeEach(function() {
        this.setProperties({
          'session.isAuthenticated': false,
          '_toggleCreateAccountModal': sinon.spy()
        })
        this.render(hbs`{{attribute-list session=session _toggleCreateAccountModal=_toggleCreateAccountModal attributes=attributes}}`);
        this.$('.t-add-trigger').click();
      })

      it('clicking add attribute does not open a form', function() {
        const $buttons = this.$('button');
        expect($buttons.eq(0).text().trim()).to.eql('');
        expect($buttons.eq(1).text().trim()).to.eql('');
      });
    });

    describe('if authenticated', function() {
      beforeEach(function() {
        this.render(hbs`{{attribute-list session=session attributes=attributes}}`);
        this.$('.t-add-trigger').click();
      });

      it('clicking add attribute opens input form', function() {
        expect(this.$('input').attr('placeholder')).to.eql('Add an attribute');
        expect(this.$('input').val()).to.be.empty;
        expect(this.$('button').first().text().trim()).to.eql('Add');
        expect(this.$('button:eq(1)').text().trim()).to.eql('Cancel');
      });

      describe('cancel', function() {
        it('closes the form', function() {
          const $cancelButton = this.$('button:eq(1)');
          expect($cancelButton.text().trim()).to.eql('Cancel');
          $cancelButton.click();
          expect(this.$('button:eq(1)').text().trim()).to.be.empty;
        });

        it('input state is reset', function() {
          const $attrInput = this.$('input');
          $attrInput.val('Should disappear');
          expect($attrInput.val()).to.eql('Should disappear');
          this.$('button:eq(1)').click(); //cancel
          this.$('.t-add-trigger').click();
          expect(this.$('input').val()).to.be.empty;
        });
      });
    });
  });
});
