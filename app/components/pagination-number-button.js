import Ember from 'ember';

const { inject: { service }, Component, computed, Logger, get, set } = Ember;

export default Component.extend({
  tagName: 'p',
  classNames: [''],

  isActive: computed('currentPageNumber', function() {
    if (get(this, 'page') === get(this, 'currentPageNumber')) {
      return true;
    }
  }),

  actions: {
    thisPage(page) {
      this.sendAction('thisPage', get(this, 'page'));
    }
  }
});
