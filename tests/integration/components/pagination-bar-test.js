/* jshint expr:true */
import { expect } from 'chai';
import {
  describeComponent,
  it
} from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describeComponent(
  'pagination-bar',
  'Integration: PaginationBarComponent',
  {
    integration: true
  },
  function() {
    it('renders', function() {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });

      this.render(hbs`{{pagination-bar}}`);
      expect(this.$()).to.have.length(1);
    });
    //create pagination-button component?
    it('adds class active to the current page number', function() {
      // let component = this.subject();
      // expect(this.$())
    });

    it('creates an li element for each page of 30 results (max 8)', function() {
    });

    it('loads next 8 page numbers when next button is clicked on last page', function() {
    });

    it('adds class disabled to previous button on first page', function() {
    });

    it('adds class disabled to next button when there are no pages left to load', function() {
    });
  }
);
