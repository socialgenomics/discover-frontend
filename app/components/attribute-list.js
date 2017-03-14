import Ember from 'ember';

const { Component, computed, get } = Ember;

export default Component.extend({
  keys: ['Assay', 'Samples', 'Tissue', 'Technology', 'Pubmed ID'],
  attributes: [
    {
      key: 'Assay',
      value: 'RNA-seq',
      userId: {
        id: '1',
        displayName: 'Testy McTestface'
      }
    },
    {
      key: 'Assay',
      value: 'WGS',
      userId: {
        id: '2',
        displayName: 'Boris McNorris'
      }
    },
    {
      key: 'Samples',
      value: '24',
      userId: {
        id: '3',
        displayName: 'Doris In A Forest'
      }
    },
    {
      key: 'Technology',
      value: 'ZX Spectrum',
      userId: {
        id: '2',
        displayName: 'Boris McNorris'
      }
    }
  ],

  //Target structure of attr object
  // {
  //   key:
  //   value:
  //   actionId: ?
  //   userId: ?
  // }

  //Get actions
    //Convert attr actions to common object
    //Convert dataset attrs to common object
      //Merge these into one array.


  // Structure of data from dataset
  attributesFromDataset: {
    assay: [
      'WGS',
      'RNA-Seq'
    ],
    samples: ['23'],
    tissue: ['heart'],
    technology: ['ZX Spectrum'],
    pubmed: ['123']
  },

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
