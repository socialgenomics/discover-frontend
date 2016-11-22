import Ember from 'ember';
import ajax from 'ic-ajax';
import ENV from 'repositive/config/environment';

const { inject: { service }, computed, Route, RSVP, get, Logger } = Ember;

export default Route.extend({
  session: service(),
  isFirstLogin: computed.and('session.data.firstVisit', 'session.isAuthenticated'),
  displayWelcomeMessage: computed.and('session.data.displayWelcomeMessage', 'session.isAuthenticated'),

  beforeModel: function() {
    if (get(this, 'isFirstLogin')) {
      this.transitionTo('beta-signup-form')
        .then(() => {
          // Don't display the 'verify email' message if user signed up with third party auth
          if (!get(this, 'session.data.thirdPartySignup')) {
            get(this, 'session').set('data.displayWelcomeMessage', true);
          }
        });
    }

    if (get(this, 'displayWelcomeMessage')) {
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
    if (get(this, 'session.isAuthenticated')) {
      const token = get(this, 'session.session.content.authenticated.token');
      const authHeaders = {
        authorization: `JWT ${token}`
      };

      return RSVP.all([
        ajax({ url: ENV.APIRoutes['stats'] , type: 'GET', headers: authHeaders }),
        ajax({ url: ENV.APIRoutes['datasets.trending'] , type: 'GET', headers: authHeaders }),
        this.store.query('request', { 'order[0][0]': 'updated_at', 'order[0][1]': 'DESC' }),
        this.store.query('dataset', { 'where.user_id.$ne': 'null', 'order[0][0]': 'updated_at', 'order[0][1]': 'DESC' }),
        this.store.query('collection', { 'where.type': 'repositive_collection', 'order[0][0]': 'updated_at', 'order[0][1]': 'DESC', 'limit': '3' }),
        ajax({ url: ENV.APIRoutes['datasources'] + '?limit=3' , type: 'GET', headers: authHeaders })
      ])
        .then(data => {
          //Normalize and push trending datasets
          const trending = data[1].map((datasetObj) => {
            return this.store.push(this.store.normalize('dataset', datasetObj));
          });

          return {
            stats: data[0],
            datasets: trending,
            requests: data[2],
            registered: data[3],
            collections: data[4],
            datasources: data[5]
          };

        })
        .catch(Logger.error);
    } else {
      return ajax({ url: ENV.APIRoutes['stats'] , type: 'GET' })
        .then(stat => {
          return { stats: stat };
        });
    }
  },

  deactivateWeclomeMesssage: function() {
    get(this, 'session').set('data.firstVisit', false);
  }.on('deactivate')
});
