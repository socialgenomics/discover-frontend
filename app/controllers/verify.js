import Ember from 'ember';
import EmberValidations from 'ember-validations';
import ServerValidationMixin from 'repositive/validators/remote/server/mixin';
import ENV from 'repositive/config/environment';
import ajax from 'ic-ajax';


export default Ember.Controller.extend(
  EmberValidations,
  ServerValidationMixin,
{
  queryParams: ['code'],
  code: null,
  session: Ember.inject.service(),

  validations: {
    code: {
      presence: true,
      server: true // must be last - unknown bug
    }
  },

  actions: {
    submitForm: function() {
      //check code against api
      ajax({
        url: ENV.APIRoutes['invites'],
        type: 'POST',
        data: {
          'invite': this.get('code')
        }
      })
      .then((resp)=> {
        if (resp.permitted) {
          this.get('session').set('data.isVerified', true);
          this.get('session').set('data.inviteCode', this.get('code'));
          this.transitionToRoute('users.signup');
        } else {
          this.addValidationErrors(resp.errors);
        }
      })
      .catch((resp)=> {
        let messages = resp.jqXHR.responseJSON.messages;
        Ember.Logger.error(messages);
        this.addValidationErrors(messages);
      });
    }
  }
});
