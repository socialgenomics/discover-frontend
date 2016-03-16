import Ember from 'ember';
import EmberValidations from 'ember-validations';
import ServerValidationMixin from 'repositive/validators/remote/server/mixin';
import ENV from 'repositive/config/environment';
import ajax from 'ic-ajax';
const { get } = Ember;

export default Ember.Controller.extend(
  EmberValidations,
  ServerValidationMixin,
{
  session: Ember.inject.service(),
  showWelcome: Ember.computed.alias('session.data.firstVisit'),
  sortUpdatedAt: ['updatedAt:desc'],
  requestsSorted: Ember.computed.sort('model.requests', 'sortUpdatedAt'),
  registrationsSorted: Ember.computed.sort('model.registered', 'sortUpdatedAt'),

  buttonDisabled: function() {
    return Ember.isEmpty(this.get('code'));
  }.property('code'),

  codeEntered: function() {
    return !Ember.isEmpty(this.get('code'));
  }.property('code'),

  queryParams: ['code'],
  code: null,

  validations: {
    code: {
      presence: {
        message: 'This field can\'t be blank.'
      },
      server: true // must be last - unknown bug
    }
  },

  actions : {
    // user clicks button on welcome page to enter site
    enterSite: function() {
      this.get('session').set('data.firstVisit', false);
    },
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
          this.get('session').set('data.hasInvite', true);
          this.get('session').set('data.inviteCode', this.get('code'));
          this.transitionToRoute('users.signup');
        } else {
          this.addValidationErrors(resp.errors);
        }
      })
      .catch((resp)=> {
        let messages = get(resp, 'jqXHR.responseJSON.messages');
        if (messages) {
          Ember.Logger.error(messages);
          this.addValidationErrors(messages);
        }
      });
    }
  }
});
