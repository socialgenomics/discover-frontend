import Ember from 'ember';
import ajax from 'ic-ajax';
import ENV from 'repositive/config/environment';

export default Ember.Route.extend({
  session: Ember.inject.service(),

  model: function() {
    if (this.get('session.isAuthenticated')) {
      return Ember.RSVP.all([
        ajax({ url: ENV.APIRoutes['datasets.search'] , type: 'GET' }),
        ajax({ url: ENV.APIRoutes['datasets.trending'] , type: 'GET' }),
        this.store.query('dataset', { isRequest: true }),
        this.store.query('dataset', { repository: 'REPOSITIVE', isRequest: false })
      ])
      .then(data => {
        return {
          stats: data[0],
          datasets: data[1].datasets,
          requests: data[2],
          registered: data[3]
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
