import Ember from 'ember';

const { Controller, computed, inject: { service }, Logger, get } = Ember;

export default Controller.extend({
  session: service(),
  urlGenerator: service(),

  dataset: computed.alias('model.dataset'),
  stats: computed.alias('model.stats'),
  comments: computed.filterBy('dataset.actionableId.actions', 'type', 'comment'),
  tags: computed.filterBy('dataset.actionableId.actions', 'type', 'tag'),

  commentsSorted : computed.sort('comments', (itemA, itemB) => {
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

  datasetUrl: computed('type', 'dataset.id', function () {
    return get(this, 'urlGenerator').generateUrl('datasets.detail', get(this, 'dataset.id'));
  }),

  actions: {
    trackExit() {
      get(this, 'metrics').trackEvent({
        category: 'discover_homeauth_datasetDetail',
        action: 'download_button',
        label: get(this, 'dataset.title')
      });
      let tab = window.open(get(this, 'dataset.url'), '_blank');
      tab.focus();
    },

    trackLinkEvent() {
      get(this, 'metrics').trackEvent({
        category: 'discover_openpage_datasetBanner_searchNow',
        action: 'link_clicked'
      });
    },

    addComment(text) {
      const userId = get(this, 'session.authenticatedUser');
      const dataset = get(this, 'dataset');
      let comment = this.store.createRecord('action', {
        actionableId: get(dataset, 'actionableId'),
        actionable_model: dataset.constructor.modelName,
        userId: userId,
        type: 'comment',
        properties: {
          text: text
        }
      });
      comment.save().catch(Logger.error);
    },

    addTag(text) {
      const userId = get(this, 'session.authenticatedUser');
      const dataset = get(this, 'dataset');
      const existingTags = get(this, 'tags');
      // if the tag already exists
      if (existingTags.findBy('properties.text', text)) {
        this.flashMessages.add({
          message: 'The tag: ' + text + ' already exists.',
          type: 'warning',
          timeout: 7000,
          class: 'fadeInOut'
        });
      } else {
        const tag = this.store.createRecord('action', {
          actionableId: get(dataset, 'actionableId'),
          actionable_model: dataset.constructor.modelName,
          userId: userId,
          type: 'tag',
          properties: {
            text: text
          }
        });
        tag.save().catch(Logger.error);
      }
    },
    toggleTagModal() {
      this.toggleProperty('isShowingTagModal');
    }
  }
});
