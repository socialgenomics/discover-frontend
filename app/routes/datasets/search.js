import Ember from 'ember';
import _ from 'npm:underscore';
import ajax from 'ic-ajax';
import ENV from 'repositive.io/config/environment';
import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin';
import Search from 'repositive.io/models/search';


export default Ember.Route.extend(AuthenticatedRouteMixin, {
  model: function(params){
    return this.store.createRecord('Search', {
      queryParams: params,
      user: this.get('currentUser'),
    });
  },
});
