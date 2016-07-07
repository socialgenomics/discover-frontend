import Ember from 'ember';
import ajax from 'ic-ajax';
import ENV from 'repositive/config/environment';

export default Ember.Route.extend({
  session: Ember.inject.service(),

  beforeModel: function() {
    if (this.get('session.data.firstVisit', true) && this.get('session.isAuthenticated')) {
      this.transitionTo('beta-signup-form')
      .then(() => this.get('session').set('data.displayWelcomeMessage', true))
    }

    if (this.get('session.data.displayWelcomeMessage', true) && this.get('session.isAuthenticated')) {
      this.flashMessages.add({
        message: 'Please check your email to verify your account',
        type: 'info',
        timeout: 7000,
        sticky: true,
        class: 'fadeIn'
      });
    }
  },

  model: function() {
    if (this.get('session.isAuthenticated')) {
      return Ember.RSVP.all([
        ajax({ url: ENV.APIRoutes['datasets.search'] , type: 'GET' }),
        ajax({ url: ENV.APIRoutes['datasets.trending'] , type: 'GET' }),
        this.store.query('dataset', {})
      ])
      .then(data => {
        // this.get('store').pushPayload(data[1].datasets);
        // HACK - pushPayload isnt working so get the dataset again!!
        let trending = data[1].datasets.map(ds => {
          return this.store.findRecord('dataset', ds.id);
        });
        return {
          stats: data[0],
          datasets: trending,
          requests: data[2],
          registered: data[2]
        };
      })
      .catch(err => {
        Ember.Logger.error(err);
        throw err;
      });
    } else {
      return null;
    }
  },
  deactivateWeclomeMesssage: function() {
    this.get('session').set('data.firstVisit', false);
  }.on('deactivate')
});
