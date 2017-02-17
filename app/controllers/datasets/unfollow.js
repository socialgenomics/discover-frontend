import Ember from 'ember';

const { Controller, Logger } = Ember;

export default Controller.extend({

  actions: {
    submitForm() {
      this.transitionToRoute('root')
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
});
