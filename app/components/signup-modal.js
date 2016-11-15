import Ember from 'ember';

const { Component } = Ember;

export default Component.extend({
  actions: {
    toggleModal: function() {
      this.sendAction();
    }
  }
});
