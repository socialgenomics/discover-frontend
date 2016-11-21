import Ember from 'ember';

export default Ember.Component.extend({
  showCreateAccountModal: false,

  actions: {
    toggleCreateAccountModal() {
      this.toggleProperty('showCreateAccountModal');
    }
  }
});
