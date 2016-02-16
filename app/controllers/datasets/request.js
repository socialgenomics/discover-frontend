import Ember from 'ember';
import EmberValidations from 'ember-validations';

export default Ember.Controller.extend(
  EmberValidations,
{
  title: null,
  description: null,
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
      var dataset = this.store.createRecord('dataset', { isRequest: 1 });
      var props = this.store.createRecord('property', {
        title: this.title,
        description: this.description
      });
      dataset.properties = props;

      dataset
      .save()
      .then((created)=> {
        this.flashMessages.add({
          message: 'Request posted successfully',
          type: 'success',
          timeout: 5000
        });
        this.transitionToRoute('datasets.detail', created.id);
        this.get('metrics').trackEvent({
          category: 'dataset',
          action: 'request',
          label: created.get('id')
        });
      });
    }

  }
});
