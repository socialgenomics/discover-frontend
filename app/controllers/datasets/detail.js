import Ember from 'ember';
import { mergeAssays } from '../../routes/datasets/detail';
import ActionCreationMixin from 'repositive/mixins/action-creation';

const { Controller, computed, inject: { service }, get, getWithDefault, isEmpty } = Ember;

export default Controller.extend(ActionCreationMixin, {
  session: service(),

  datasetEditableProperties: [
    { key: 'title' },
    { key: 'description', multiline: true },
    { key: 'url' }
  ],

  datasetsNumber: computed('model.stats.datasets', function() {
    return get(this, 'model.stats.datasets').toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }),

  attributes: computed('model.dataset.properties.attributes', 'model.attributes', function() {
    const datasetAttrs = getWithDefault(this, 'model.dataset.properties.attributes', {});
    const actionAttrs = getWithDefault(this, 'model.attributes', []);
    return this._mergeAttributes(actionAttrs, datasetAttrs)
      .reject(attr =>  attr.key === 'pmid' && isEmpty(attr.value));
  }),

  assaysToDisplay: computed('model.dataset', 'model.attributes.[]', function() {
    const userAssays = getWithDefault(this, 'model.attributes', [])
      .filterBy('properties.key', 'assay')
      .mapBy('properties.value');
    return mergeAssays(get(this, 'model.dataset'), userAssays);
  }),

  contributors: computed('model.attributes.[]', function() {
    const contributorIds = this.store.peekAll('action')
      .filterBy('type', 'attribute')
      .filterBy('datasetId.id', get(this, 'model.dataset.id'))
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
        const keyValue = attributesFromDataset[key];
        if (isEmpty(keyValue) || 'pmid' in keyValue) { return attrObjects; }
        return [
          ...attrObjects,
          ...keyValue.map(value => { return { key, value }; })
        ];
      }, []);
    } else { return []; }
  }
});
