import Ember from 'ember';

const { Component, set } = Ember;

export default Component.extend({
  classNames: ['c-card', 'p2'],
  openGroup: '',

  actions: {
    setOpenGroup(headingName) {
      set(this, 'openGroup', headingName);
    }
  }
});
