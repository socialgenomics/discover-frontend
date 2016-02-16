import Ember from 'ember';
import EmberValidations from 'ember-validations';
export default Ember.Controller.extend(
  EmberValidations,
{
  title: null,
  description: null,
  webURL: null,
  loading: false,
  validations: {
    title: {
      presence: { message: 'This field can\'t be blank.' }
    },
    description: {
      presence: { message: 'This field can\'t be blank.' }
    },
    webURL: {
      format: {
        with: /[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/,
        allowBlank: true,
        message: 'must be a valid url'
      }
    }
  },
  actions: {
    addDataset: function() {
      if (this.get('isValid')) {
        this.set('loading', true);

        var dataset = this.store.createRecord('dataset', {});
        var props = this.store.createRecord('property', {
          title: this.title,
          description: this.description,
          webURL: this.webURL
        });
        dataset.properties = props;

        dataset
        .save()
        .then((created)=> {
          this.flashMessages.add({
            message: 'Dataset successfully registered',
            type: 'success',
            timeout: 5000
          });
          this.transitionToRoute('datasets.detail', created.id);
          this.get('metrics').trackEvent({
            category: 'dataset',
            action: 'register',
            label: created.get('id')
          });
        })
        .catch(function(err) {
          console.log(err);
          this.set('loading', false);
        });
      }
    }

  }
});
