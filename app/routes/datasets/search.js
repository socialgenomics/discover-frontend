import Ember from 'ember';


export default Ember.Route.extend({
  session: Ember.inject.service(),
  model: function(params) {
    return this.store.createRecord('Search', {
      queryParams: params,
      user: this.get('session.data.authenticatedUser')
    });
  }
});
