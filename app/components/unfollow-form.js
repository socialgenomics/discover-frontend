import Ember from 'ember';

const { Component, Logger, computed, get, set } = Ember;

export default Component.extend({
  tagName: 'form',
  isInvalid: true,

  actions: {
    enableSubmit() {
      return set(this, 'isInvalid', false)
    },

    submitForm() {
      if (!get(this, 'isInvalid')) {
        return this.sendAction('submitUnfollowForm')
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
