import Ember from 'ember';
import EmberValidations from 'ember-validations';
import ServerValidationMixin from 'repositive/validators/remote/server/mixin';
import ENV from 'repositive/config/environment';
import ajax from 'ic-ajax';

export default Ember.Controller.extend(
  EmberValidations,
  ServerValidationMixin,
{
  session: Ember.inject.service(),
  showWelcome: Ember.computed.alias('session.data.firstVisit'),
  requestsSorted: Ember.computed.sort('model.requests', 'updatedAt'),
  registrationsSorted:  Ember.computed.sort('model.registered', 'updatedAt'),

  queryParams: ['code'],
  code: null,

  validations: {
    code: {
      presence: true,
      server: true // must be last - unknown bug
    }
  },

  buttonDisabled: function() {
    return Ember.isEmpty(this.get('code'));
  }.property('code'),

  codeEntered: function() {
    return !Ember.isEmpty(this.get('code'));
  }.property('code'),

  requestsSorted:  function() {
    return Ember.ArrayProxy.extend(Ember.SortableMixin).create({
      sortProperties: ['updatedAt'],
      sortAscending: false,
      content: this.get('model.requests')
    });
  }.property('model.requests'),

  registrationsSorted:  function() {
    return Ember.ArrayProxy.extend(Ember.SortableMixin).create({
      sortProperties: ['updatedAt'],
      sortAscending: false,
      content: this.get('model.registered')
    });
  }.property('model.registered'),

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
        let messages = resp.jqXHR.responseJSON.messages;
        Ember.Logger.error(messages);
        this.addValidationErrors(messages);
      });
    }
  }
});
