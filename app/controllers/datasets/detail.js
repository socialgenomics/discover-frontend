import Ember from 'ember';

const { Controller, computed, inject: { service }, get } = Ember;

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

  actions: {
    trackLinkEvent() {
      get(this, 'metrics').trackEvent({
        category: 'discover_openpage_datasetBanner_searchNow',
        action: 'link_clicked'
      });
    }
  }
});
