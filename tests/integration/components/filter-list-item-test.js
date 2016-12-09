/* jshint expr:true */
import { expect } from 'chai';
import {
  describeComponent,
  it
} from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describeComponent(
  'filter-list-item',
  'Integration: FilterListItemComponent',
  {
    integration: true
  },
  function() {
    it('Renders the filter name and count.', function() {
      this.setProperties({
        bucket: {
          key: 'Abc',
          doc_count: 8,
          colour: null
        },
        aggName: 'Datasource'
      });
      this.render(hbs`{{filter-list-item bucket=bucket aggName=aggName}}`);
      expect(this.$('span').text().trim()).to.eql('Abc (8)x');
    });

    it('If filter is assay, render colour, filter name and count.', function() {
      this.setProperties({
        bucket: {
          key: 'Assay Abc',
          doc_count: 10,
          colour: 'indigo'
        },
        aggName: 'assay'
      });
      this.render(hbs`{{filter-list-item bucket=bucket aggName=aggName}}`);
      expect(this.$('span').text().trim()).to.eql('Assay Abc (10)x');
      expect(this.$('div.label').hasClass('indigo')).to.be.true;
    });
  }
);
