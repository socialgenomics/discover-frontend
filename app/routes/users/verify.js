import Ember from 'ember';
import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin';
import ajax from 'ic-ajax';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  verificationId:null,

  model: function(params){
    this.set("verificationId", params.verificationId);
  },
  setupController: function(controller, model) {
    ajax({
      url: '/api/users/verify/' + this.get('verificationId'),
      type:'GET',
    })
    .then(resp=>{
      // this.transitionTo('users.profile');
    })
    .catch(err=>{
      // TODO
    });
  }
});
