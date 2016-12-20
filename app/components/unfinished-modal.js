import Ember from 'ember';

const { get, Component } = Ember;

export default Component.extend({
  actions: {
    toggleModal() {
      get(this, 'toggleModal')();
    }
  }
});
