import Ember from 'ember';

const { Controller, computed, inject: { service }, Logger } = Ember;

export default Controller.extend({
  session: service(),

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
    return this.get('stats.datasets').toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }),

  actions: {
    trackExit() {
      this.get('metrics').trackEvent({
        category: 'dataset',
        action: 'download',
        label: this.get('dataset.title')
      });
      let tab = window.open(this.get('dataset.url'), '_blank');
      tab.focus();
    },

    addComment(text) {
      const userId = this.get('session.authenticatedUser');
      const dataset = this.get('dataset');
      let comment = this.store.createRecord('action', {
        actionableId: dataset.get('actionableId'),
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
      const userId = this.get('session.authenticatedUser');
      const dataset = this.get('dataset');
      const existingTags = this.get('tags');
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
          actionableId: dataset.get('actionableId'),
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
