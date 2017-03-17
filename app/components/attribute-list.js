import Ember from 'ember';

const { Component, computed, get, set } = Ember;

export default Component.extend({
  // MOCK DATASET ATTRIBUTES DATA
  attributesFromDataset: {
    assay: [
      'WGS',
      'RNA-Seq'
    ],
    samples: ['23'],
    tissue: ['heart'],
    technology: ['ZX Spectrum'],
    pmid: ['123']
  },

  userGeneratedAttributes: computed('attributeActions', function() {
    return get(this, 'attributeActions').map(this._convertActionToCommonObj);
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

  mergedObjects: computed('userGeneratedAttributes', 'datasetAttributes', function() {
    return [].concat(get(this, 'userGeneratedAttributes'), get(this, 'datasetAttributes'));
  }),

  /**
   * @desc dataset and user added attributes sorted by key
   * @param {Array} list of objs
   * @returns {Object} hash of keys each with a list of elements
   */
  groups: computed('mergedObjects', function() {
    const attributes = get(this, 'mergedObjects');
    const keys = ['assay', 'samples', 'tissue', 'technology', 'pmid'];

    return keys.reduce((keyHash, key) => {
      keyHash[key] = attributes.filterBy('key', key);
      return keyHash;
    }, {});
  }),

  actions: {
    setOpenInput(key) { set(this, 'openInput', key); },
    closeInput() { set(this, 'openInput', null); }
  },

  /**
   * @desc convert action of type attribute into a common attribute obj
   * @param {Object} attribute
   * @returns {Object} common attribute object
   * @private
   */
  _convertActionToCommonObj(attribute) {
    return {
      key: get(attribute, 'properties.key'),
      value: get(attribute, 'properties.value'),
      actionId: get(attribute, 'id'),
      userId: get(attribute, 'userId.id')
    };
  }
});
