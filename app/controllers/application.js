import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service(),
  isShowingModal: false,

  actions: {
    toggleModal() {
      this.toggleProperty('isShowingModal');
    }
  }
});
