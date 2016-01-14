import Ember from 'ember';
import EmberValidations from 'ember-validations';
import ServerValidationMixin from 'repositive/validators/remote/server/mixin';
import ENV from 'repositive/config/environment';
import ajax from 'ic-ajax';

export default Ember.Route.extend(EmberValidations, ServerValidationMixin, {
  beforeModel: function() {
    //if verified transition to signup route
    if (this.controllerFor('Application').get('isVerified')) {
      this.transitionTo('users.signup');
    }
  },

  queryParams: ['code'],
  code: null,
  needs: 'application',

  validations: {
    code: {
      presence: true,
      server: true // must be last - unknown bug
    }
  },

  actions: {
    submitForm: function() {
      //check code against api
      this.set('controllers.application.isVerified', true);
      ajax({
        url: ENV.APIRoutes['invites'],
        type: 'POST',
        data: {
          'invite': this.code
        }
      })
      .then((resp)=> {
        if (resp.permitted) {
          this.set('controllers.application.code', this.get('code'));
          this.transitionToRoute('/users/signup');
        } else {
          this.addValidationErrors(resp.errors);
        }
      })
      .catch((resp)=> {
        Ember.Logger.error(resp.jqXHR.responseJSON);
        this.addValidationErrors(resp.jqXHR.responseJSON.errors);
      });
    }
  }
});
