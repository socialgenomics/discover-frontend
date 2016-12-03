import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['share-options-button'],
  showShareOptionsModal: false,

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
