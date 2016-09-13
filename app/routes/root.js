import Ember from 'ember';
import ajax from 'ic-ajax';
import ENV from 'repositive/config/environment';

export default Ember.Route.extend({
  session: Ember.inject.service(),

  beforeModel: function() {
    if (this.get('session.data.firstVisit', true) && this.get('session.isAuthenticated')) {
      this.transitionTo('beta-signup-form')
      .then(() => {
        // Don't display the 'verify email' message if user signed up with third party auth
        if (!this.get('session.data.thirdPartySignup')) {
          this.get('session').set('data.displayWelcomeMessage', true);
        }
      });
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
      //Get search data
      //Get trending datasets
      //Get recent requests and registrations
      let token = this.get('session.session.content.authenticated.token');
      let authHeaders = {
        authorization: `JWT ${token}`
      };

      return Ember.RSVP.all([
        ajax({ url: ENV.APIRoutes['datasets.search'] , type: 'GET', headers: authHeaders }),
        ajax({ url: ENV.APIRoutes['datasets.trending'] , type: 'GET', headers: authHeaders }),
        this.store.query('request', {}),
        this.store.query('dataset', { user_registered: true })
      ])
      .then(data => {
        //Normalize and push trending datasets
        let trending = data[1].map((datasetObj) => {
          return this.store.push(this.store.normalize('dataset', datasetObj));
        });

        return {
          stats: data[0],
          datasets: trending,
          requests: data[2],
          registered: data[3]
        };
      })
      .catch(err => {
        Ember.Logger.error(err);
        throw err;
      });
    } else {
      return ajax({ url: ENV.APIRoutes['datasets.search'] , type: 'GET' })
      .then(stat => {
        return { stats: stat };
      });
    }
  },

  deactivateWeclomeMesssage: function() {
    this.get('session').set('data.firstVisit', false);
  }.on('deactivate')
});
