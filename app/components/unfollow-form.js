import Ember from 'ember';

const { Component, Logger, get, set } = Ember;

export default Component.extend({
  tagName: 'form',
  isInvalid: true,

  actions: {
    enableSubmit() {
      return set(this, 'isInvalid', false)
    },

    submitForm() {
      if (!get(this, 'isInvalid')) {
        return get(this, 'transitionToRoot')
        .then(() => {
          return get(this, 'flashMessages').add({
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
