import Ember from 'ember';

const { Component, get, set } = Ember;

export default Component.extend({
  classNames: ['c-card'],
  openGroup: '',

  actions: {
    setOpenGroup(headingName) {
      get(this, 'openGroup') === headingName ?
        set(this, 'openGroup', '') :
        set(this, 'openGroup', headingName);
    }
  }
});
