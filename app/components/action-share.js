import Ember from 'ember';

const { Component } = Ember;

export default Component.extend({
  classNames: ['share-options-button'],
  showShareOptionsModal: false,

  // modal constraints prevents share options modal from bleeding out of the edge of browser window
  shareOptionsModalConstraints: [{ to: 'window', pin: true }],

  click: function() {
    this.get('metrics').trackEvent({
      category: 'dataset',
      action: 'share',
      label: this.get('dataset.id'),
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
