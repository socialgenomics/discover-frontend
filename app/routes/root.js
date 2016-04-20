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
        // this.get('store').pushPayload(data[1].datasets);
        // let trending = data[1].datasets.map(ds => {
        //   return this.store.peekRecord('dataset', ds.id);
        // });
        // HACK - pushPayload isnt working so get the dataset again!!
        let trending = data[1].datasets.map(ds => {
          return this.store.findRecord('dataset', ds.id);
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
      this.transitionTo('users.signup');
      return null;
    }
  },
  deactivateWeclomeMesssage: function() {
    this.get('session').set('data.firstVisit', false);
  }.on('deactivate')
});
