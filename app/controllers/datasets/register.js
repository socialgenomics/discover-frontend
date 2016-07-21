import Ember from 'ember';
import EmberValidations from 'ember-validations';
import ajax from 'ic-ajax';

export default Ember.Controller.extend(
  EmberValidations,
{
  session: Ember.inject.service(),

  title: null,
  description: null,
  url: null,
  loading: false,
  validations: {
    title: {
      presence: { message: 'This field can\'t be blank.' }
    },
    description: {
      presence: { message: 'This field can\'t be blank.' }
    },
    url: {
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
        ajax({ url: 'https://backend-dev.repositive.io/datasources?short_name=REPOSITIVE', type: 'GET' })
        .then(datasource => {
          return this.store.findRecord('datasource', datasource.datasources[0].id);
        })
        .then(datasourceModel => {
          const userId = this.get('session.authenticatedUser.id');
          const userModel = this.get('session.authenticatedUser');
          const dataset = this.store.createRecord('dataset', {
            title: this.title,
            description: this.description,
            url: this.url,
            datasourceId: datasourceModel,
            externalID: userId + Date.now(),
            userId: userModel
          });
          dataset.save()
          .then((created) => {
            this.flashMessages.add({
              message: 'Dataset successfully registered',
              type: 'success',
              timeout: 7000,
              class: 'fadeInOut'
            });
            this.transitionToRoute('datasets.detail', created.id);
            this.get('metrics').trackEvent({
              category: 'dataset',
              action: 'register',
              label: created.get('id')
            });
          });
        })
        .catch(err => {
          this.set('loading', false);
          Ember.Logger.error(err);
        });
      }
    }
  }
});
