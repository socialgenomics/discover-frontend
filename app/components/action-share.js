import Ember from 'ember';

const { Component, get } = Ember;

export default Component.extend({
  classNames: ['share-options-button'],
  showShareOptionsModal: false,

  click() {
    get(this, 'metrics').trackEvent({
      category: 'dataset',
      action: 'share',
      label: get(this, 'dataset.id'),
      value: true
    });
    this.send('toggleShareOptionsModal');
  },

  actions: {
    toggleShareOptionsModal() {
      this.toggleProperty('showShareOptionsModal');
    }
  }
});
