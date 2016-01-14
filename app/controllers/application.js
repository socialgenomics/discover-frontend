import Ember from 'ember';

export default Ember.Controller.extend({
  isVerified: false,
  isShowingModal: false,

  actions: {
    toggleModal() {
      this.toggleProperty('isShowingModal');
    }
  }
});
