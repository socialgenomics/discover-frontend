import Ember from 'ember';

const { Controller } = Ember;

export default Controller.extend({
  actions: {
    submitUnfollowForm() {
      this.transitionToRoute('root');
    }
  }
});
