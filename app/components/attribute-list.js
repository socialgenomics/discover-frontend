import Ember from 'ember';

const { Component, computed, get } = Ember;

export default Component.extend({
  keys: ['Assay', 'Samples', 'Tissue', 'Technology', 'Pubmed ID'],

  attributes: [
    {
      key: 'Assay',
      value: 'RNA-seq',
      userId: {
        displayName: 'Testy McTestface'
      }
    },
    {
      key: 'Assay',
      value: 'WGS',
      userId: {
        displayName: 'Boris McNorris'
      }
    },
    {
      key: 'Samples',
      value: '24',
      userId: {
        displayName: 'Doris In A Forest'
      }
    },
    {
      key: 'Technology',
      value: 'ZX Spectrum',
      userId: {
        displayName: 'Boris McNorris'
      }
    }
  ],

  groups: computed('attributes', 'keys', function() {
    const attributes = get(this, 'attributes');
    return {
      'Assay': attributes.filterBy('key', 'Assay'),
      'Sample': attributes.filterBy('key', 'Sample'),
      'Tissue': attributes.filterBy('key', 'Tissue'),
      'Technology': attributes.filterBy('key', 'Technology'),
      'Pubmed ID': attributes.filterBy('key', 'Pubmed ID')
    };
  })
});
