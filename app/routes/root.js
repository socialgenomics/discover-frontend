import Ember from 'ember';
import ENV from 'repositive/config/environment';
import FlashMessageMixin from 'repositive/mixins/flash-message-mixin';

const { inject: { service }, computed, Route, RSVP, get, set, Logger, setProperties } = Ember;

export default Route.extend(FlashMessageMixin, {
  session: service(),
  ajax: service(),

  isFirstLogin: computed.and('session.data.firstVisit', 'session.isAuthenticated'),

  beforeModel() {
    if (get(this, 'isFirstLogin')) {
      this.transitionTo('signup-survey')
        .then(() => {
          // Don't display the 'verify email' message if user signed up with third party auth
          if (!get(this, 'session.data.thirdPartySignup')) {
            set(this, 'session.data.displayWelcomeMessage', true);
          }
        });
    }
    if (get(this, 'session.data.displayWelcomeMessage')) {
      this._addFlashMessage('Please check your email to verify your account', 'info');
    }
  },

  model() {
    set(this, 'session.data.isRootRoute', true);
    const ajax = get(this, 'ajax');
    if (get(this, 'session.isAuthenticated')) {
      return RSVP.hash({
        stats: ajax.request(ENV.APIRoutes['stats'], { method: 'GET' }),
        datasets: ajax.request(ENV.APIRoutes['datasets.trending'], { method: 'GET' }),
        requests: this.store.query('request', { 'order[0][0]': 'created_at', 'order[0][1]': 'DESC' }),
        registered: this.store.query('dataset', { 'where.user_id.$ne': 'null', 'order[0][0]': 'created_at', 'order[0][1]': 'DESC' }),
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
  deactivate() {
    setProperties(this, {
      'session.data.firstVisit': false,
      'session.data.isRootRoute': false
    });
  }
});
