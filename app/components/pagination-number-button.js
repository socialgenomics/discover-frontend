import Ember from 'ember';

const { inject: { service }, Component, computed, Logger, get, set } = Ember;

export default Component.extend({
  tagName: 'p',
  classNames: [''],

  isActive: computed.equal(get(this, 'page'), get(this, 'currentPageNumber')),

  actions: {
    goToPage(page) {
      this.sendAction('goToPage', get(this, 'page'));
    }
  }
});
