import Ember from 'ember';
import EmberValidations from 'ember-validations';

export default Ember.Controller.extend(
  EmberValidations,
{
  session: Ember.inject.service(),

  title: null,
  description: null,
  loading: false,
  validations: {
    title: {
      presence: { message: 'This field can\'t be blank.' }
    },
    description: {
      presence: { message: 'This field can\'t be blank.' }
    }
  },
  actions: {
    addRequest: function() {
      if (this.get('isValid')) {
        this.store.createRecord('request', {
          userId: this.get('session.authenticatedUser'),
          title: this.title,
          description: this.description
        })
        .save()
        .then((created)=> {
          this.flashMessages.add({
            message: 'Request created successfully.',
            type: 'success',
            timeout: 7000,
            class: 'fadeInOut'
          });
          this.transitionToRoute('datasets.detail', created.id);
          this.get('metrics').trackEvent({
            category: 'dataset',
            action: 'request',
            label: created.get('id')
          });
        })
        .catch(err => {
          this.set('loading', false);
          this.flashMessages.add({
            message: 'Oh dear. There was a problem submitting your dataset request.',
            type: 'warning',
            timeout: 7000,
            class: 'fadeInOut'
          });
          Ember.Logger.error(err);
        });
      }
    }
  }
});
