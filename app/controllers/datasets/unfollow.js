import Ember from 'ember';

const { Controller, Logger, computed, get, set } = Ember;

export default Controller.extend({
  isInvalid: true,

  actions: {
    enableSubmit() {
      return set(this, 'isInvalid', false)
    },

    submitForm() {
      if (!get(this, 'isInvalid')) {
        return this.transitionToRoute('root')
        .then(() => {
          this.flashMessages.add({
            message: 'Thank you for your feedback.',
            type: 'success'
          });
        })
        .catch((err) => {
          Logger.error(err);
        });
      }
    }
  }
});
