import Ember from 'ember';
import ENV from 'repositive/config/environment';

const { inject: { service }, computed, Route, RSVP, get, Logger } = Ember;

export default Route.extend({
  session: service(),
  ajax: service(),
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
    const ajax = get(this, 'ajax');
    if (get(this, 'session.isAuthenticated')) {
      return RSVP.hash({
        stats: ajax.request(ENV.APIRoutes['stats'], { method: 'GET' }),
        datasets: ajax.request(ENV.APIRoutes['datasets.trending'], { method: 'GET' }),
        requests: this.store.query('request', { 'order[0][0]': 'updated_at', 'order[0][1]': 'DESC' }),
        registered: this.store.query('dataset', { 'where.user_id.$ne': 'null', 'order[0][0]': 'updated_at', 'order[0][1]': 'DESC' }),
        collections: this.store.query('collection', { 'where.type': 'repositive_collection', 'order[0][0]': 'updated_at', 'order[0][1]': 'DESC', 'limit': '3' }),
        datasources: this.store.query('collection', { 'where.type': 'datasource', 'order[0][0]': 'updated_at', 'order[0][1]': 'DESC', 'limit': '3' })
      })
        .then(data => {
          //Normalize and push trending datasets
          const trending = data.datasets.map((datasetObj) => {
            return this.store.push(this.store.normalize('dataset', datasetObj));
          });

          return {
            stats: data.stats,
            datasets: trending,
            requests: data.requests,
            registered: data.registered,
            collections: data.collections,
            datasources: data.datasources
          };
        })
        .catch(Logger.error);
    } else {
      return ajax.request(ENV.APIRoutes['stats'], { method: 'GET' })
        .then(stat => {
          return { stats: stat };
        });
    }
  },

  deactivateWeclomeMesssage: function() {
    get(this, 'session').set('data.firstVisit', false);
  }.on('deactivate')
});
