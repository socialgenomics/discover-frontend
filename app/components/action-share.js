import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'a',
  click: function() {
    this.get('metrics').trackEvent({
      category: 'dataset',
      action: 'share',
      label: this.get('dataset.id'),
      value: true
    });
    //sends to showModal in parent controller
    this.sendAction();
  }
});
