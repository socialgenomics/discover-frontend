import Ember from 'ember';
import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin';
import ajax from 'ic-ajax';

export default Ember.Route.extend({
  verificationId:null,
  isAuthenticated: Ember.computed(function() {
    return this.get('session.isAuthenticated');
  }),
  currentUser: Ember.computed(function() {
    return this.get('session.secure.user');
  }),

  model: function(params){
    // return a promise.. this pauses the page rendering until the promise is resolved or rejected
    // loding page is shown whilst the promise in unresolved
    // error page is shown if the promise is rejected
    return ajax({
      url: '/api/users/verify/' + params.verificationId,
      type:'GET',
    })
    .then(resp=>{
      /**
      * Backend validated the email address - transitionTo the profile without
      * rendering the current page (i.e do not resolve the promise before transitioning).
      */
      this.store.findRecord('user', this.get('session.secure.user.id'))
      .then(user=>{
        user.set("isEmailValidated", true);
      });
      this.transitionTo('user', this.get('session.secure.user.username'));
    })
    .catch((err)=>{
      Ember.Logger.error(err);
      Ember.RSVP.resolve() // fulfills the promise - this causes ember to render the template
    });
  },

  actions: {
    resendVerifyEmail: function() {
      ajax({
        url: '/api/users/verify/resend/' + this.get('session.secure.user.email'),
        type:'GET',
      })
    }
  }
});
