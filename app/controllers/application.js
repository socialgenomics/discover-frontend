import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service(),
  moment: Ember.inject.service(),
  isShowingModal: false,
  actions: {
    toggleModal() {
      this.toggleProperty('isShowingModal');
    },

    changeDefaultFormat() {
     this.set('moment.defaultFormat', 'DD.MM.YYYY');
   }
  }
});
