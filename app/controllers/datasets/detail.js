import Ember from 'ember';
import { mergeAssays } from '../../routes/datasets/detail';
import ActionCreationMixin from 'repositive/mixins/action-creation';

const { Controller, computed, inject: { service }, get, getWithDefault } = Ember;

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

  assaysToDisplay: computed('model.dataset', 'attributes.[]', function() {
    const userAssays = getWithDefault(this, 'model.attributes', [])
      .filterBy('properties.key', 'assay')
      .mapBy('properties.value');
    return mergeAssays(get(this, 'model.dataset'), userAssays);
  }),

  contributors: computed('attributes.[]', function() {
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
  }
});
