import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service(),
  isVerified: false,
  isShowingModal: false,

  actions: {
    toggleModal() {
      this.toggleProperty('isShowingModal');
    }
  }
});
