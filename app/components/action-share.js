import Ember from 'ember';

const { Component, get } = Ember;

export default Component.extend({
  tagName: 'a',
  click: function() {
    get(this, 'metrics').trackEvent({
      category: 'dataset',
      action: 'share',
      label: get(this, 'dataset.id'),
      value: true
    });
    get(this, 'toggleModal')();
  }
});
