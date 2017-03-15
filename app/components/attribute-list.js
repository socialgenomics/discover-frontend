import Ember from 'ember';

const { Component, computed, get, set } = Ember;

export default Component.extend({

  // attributes: [
  //   {
  //     key: 'Assay',
  //     value: 'RNA-seq',
  //     userId: {
  //       id: '1',
  //       displayName: 'Testy McTestface'
  //     }
  //   },
  //   {
  //     key: 'Assay',
  //     value: 'WGS',
  //     userId: {
  //       id: '2',
  //       displayName: 'Boris McNorris'
  //     }
  //   },
  //   {
  //     key: 'Samples',
  //     value: '24',
  //     userId: {
  //       id: '3',
  //       displayName: 'Doris In A Forest'
  //     }
  //   },
  //   {
  //     key: 'Technology',
  //     value: 'ZX Spectrum',
  //     userId: {
  //       id: '2',
  //       displayName: 'Boris McNorris'
  //     }
  //   }
  // ],

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

  userGeneratedAttributes: computed('attributeActions', function() {
    return get(this, 'attributeActions')
      .map(attribute => this._convertActionToCommonObj(attribute));
  }),

  datasetAttributes: computed('attributesFromDataset', function() {
    const attributesFromDataset = get(this, 'attributesFromDataset');

    return Object.keys(attributesFromDataset).reduce((attrObjects, key) => {
      attributesFromDataset[key].map(value => {
        attrObjects.push({ key, value });
      });
      return attrObjects;
    }, []);
  }),

  // groups: computed('attributes', function() {
  //   const attributes = get(this, 'attributes');
  //   return {
  //     'Assay': attributes.filterBy('key', 'Assay'),
  //     'Sample': attributes.filterBy('key', 'Sample'),
  //     'Tissue': attributes.filterBy('key', 'Tissue'),
  //     'Technology': attributes.filterBy('key', 'Technology'),
  //     'Pubmed ID': attributes.filterBy('key', 'Pubmed ID')
  //   };
  // }),

  actions: {
    setOpenInput(key) { set(this, 'openInput', key); }
  },

  _convertActionToCommonObj(attribute) {
    return {
      key: get(attribute, 'properties.key'),
      value: get(attribute, 'properties.value'),
      actionId: get(attribute, 'id'),
      userId: get(attribute, 'userId.id')
    };
  },
});
