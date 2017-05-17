import Ember from 'ember';
import { mergeAssays } from '../../routes/datasets/detail';

const { Controller, computed, inject: { service }, get, getWithDefault, isEmpty } = Ember;

export default Controller.extend({
  session: service(),

  datasetEditableProperties: [
    { key: 'title' },
    { key: 'description', multiline: true },
    { key: 'url' }
  ],

  dataset: computed.alias('model.dataset'),
  stats: computed.alias('model.stats'),
  comments: computed.filterBy('dataset.actionableId.actions', 'type', 'comment'),
  tags: computed.filterBy('dataset.actionableId.actions', 'type', 'tag'),

  commentsSorted: computed.sort('comments', (itemA, itemB) => {
    if (itemA.get('createdAt') < itemB.get('createdAt')) {
      return 1;
    } else if (itemA.get('createdAt') > itemB.get('createdAt')) {
      return -1;
    }
    return 0;
  }),

  datasetsNumber: computed('stats.datasets', function() {
    return get(this, 'stats.datasets').toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }),

  attributes: computed('dataset.properties.attributes', 'dataset.actionableId.actions', function() {
    const datasetAttrs = getWithDefault(this, 'dataset.properties.attributes', {});
    const actionAttrs = getWithDefault(this, 'dataset.actionableId.actions', []).filterBy('type', 'attribute');
    return this._mergeAttributes(actionAttrs, datasetAttrs)
      .reject(attr =>  attr.key === 'pmid' && isEmpty(attr.value));
  }),

  assaysToDisplay: computed('dataset', 'dataset.actionableId.actions.[]', function() {
    const userAssays = getWithDefault(this, 'dataset.actionableId.actions', [])
      .filterBy('properties.key', 'assay')
      .mapBy('properties.value');
    return mergeAssays(get(this, 'dataset'), userAssays);
  }),

  contributors: computed('dataset.actionableId.actions.[]', function() {
    const contributorIds = this.store.peekAll('action')
      .filterBy('type', 'attribute')
      .filterBy('actionableId.id', get(this, 'dataset.id'))
      .mapBy('userId.id')
      .uniq();
    return this.store.peekAll('user')
      .filter(user => contributorIds.includes(user.id));
  }),

  actions: {
    trackLinkEvent() {
      get(this, 'metrics').trackEvent({
        category: 'discover_openpage_datasetBanner_searchNow',
        action: 'link_clicked'
      });
    }
  },

  _mergeAttributes(attributeActions = [], attributesFromDataset) {
    const actionAttrs = attributeActions.map(this._convertActionToCommonObj);
    const datasetAttrs = this._convertDatasetAttrsToCommonObjList(attributesFromDataset);
    return [...datasetAttrs, ...actionAttrs];
  },

  _convertActionToCommonObj(attribute) {
    return {
      key: get(attribute, 'properties.key'),
      value: get(attribute, 'properties.value'),
      actionId: get(attribute, 'id'),
      userId: get(attribute, 'userId.id')
    };
  },

  _convertDatasetAttrsToCommonObjList(attributesFromDataset) {
    if (attributesFromDataset) {
      return Object.keys(attributesFromDataset).reduce((attrObjects, key) => {
        return [
          ...attrObjects,
          ...attributesFromDataset[key].map(value => { return { key, value }; })
        ];
      }, []);
    } else { return []; }
  }
});
