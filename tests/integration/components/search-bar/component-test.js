import Ember from 'ember';
import { expect } from 'chai';
import { beforeEach, describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';
import sinon from 'sinon';
import { typeInSearch, clickTrigger } from '../../../helpers/ember-power-select';

const { $ } = Ember;

describe('Integration | Component | search bar', function() {
  setupComponentTest('search-bar', {
    integration: true
  });

  beforeEach(function() {
    this.set('search', sinon.spy());
    this.render(hbs`{{search-bar search=search}}`);
  })

  describe('On render', function() {
    it('should display the correct placeholder text', function() {
      expect($('.ember-power-select-typeahead-input').attr('placeholder'))
        .to.eql('Search over 1 million human genomic datasets');
    });
  });

  describe('Predicate options', function() {
    it('should open the dropdown and show predicate options on click', function() {
      clickTrigger();
      const $dropdown = $('.ember-power-select-dropdown');
      const $predicateOptions = $('.c-predicate-options');
      expect($dropdown.length).to.eql(1);
      expect($predicateOptions.find('h3').text().trim()).to.eql('Narrow your search');
      expect($predicateOptions.children().eq(1).text().trim()).to.eql('Assay: (e.g. gwas)');
    });

    it('should filter the predicate options depending on the search query', function() {
      clickTrigger();
      typeInSearch('Dis');
      const $predicateOptions = $('.c-predicate-options');
      expect($predicateOptions.children().eq(1).text().trim()).to.eql('Disease: (e.g. Myeloma)');
    });
  });

  describe('Loading state', function() {
    it('should display a loading spinner when text is entered', function() {
      clickTrigger();
      typeInSearch('D');
      const $loadingSpinner = $('.c-search-bar-loading').children().eq(0);
      expect($loadingSpinner.prop('tagName').toLowerCase()).to.eql('i');
      expect($loadingSpinner.hasClass('fa-circle-o-notch')).to.be.true;
    });
  });
});
