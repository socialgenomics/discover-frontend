import Ember from 'ember';
import ajax from 'ic-ajax';
import ENV from 'repositive/config/environment';

export default Ember.Route.extend({
  session: Ember.inject.service(),
  actionsService: Ember.inject.service('actions'),

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
    let self = this;
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
        this.store.query('dataset', { user_registered: true }),
        this.store.query('datasource', {}),
        this.get('actionsService').loadFavourites()
      ])
      .then(data => {
        //Normalize and push trending datasets
        let trending = data[1].map((datasetObj) => {
          return this.store.push(this.store.normalize('dataset', datasetObj));
        });

        // Reduce the array of objects to single obj
        function reducer(acc, curr) {
          if (curr && !acc.find(id => id === curr)) {
            acc.push(curr);
          }
          return acc;
        }

        function getProfiles(userGeneratedRecords) {
          return Ember.RSVP.all(
            userGeneratedRecords.get('content')
            .map(m => m.record.get('userId').get('id'))
            .reduce(reducer, [])
            .map(userId => self.store.query('userProfile', {
              'user_id': userId
            }))
          )
        }

        return Ember.RSVP.all([
          getProfiles(data[2]),
          getProfiles(data[3])
        ])
        .then(o => {
          return {
            stats: data[0],
            datasets: trending,
            requests: data[2],
            registered: data[3],
            datasources: data[4]
          };
        })
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
