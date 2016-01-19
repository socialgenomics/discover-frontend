import Ember from 'ember';
import EmberValidations from 'ember-validations';
import ServerValidationMixin from 'repositive/validators/remote/server/mixin';
import ENV from 'repositive/config/environment';
import ajax from 'ic-ajax';

export default Ember.Controller.extend({

  queryParams: ['code'],
  code: null,
  needs: 'application',

  validations: {
    code: {
      presence: true,
      server: true // must be last - unknown bug
    }
  },

  buttonDisabled: function() {
    return Ember.isEmpty(this.get('code'));
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
      this.set('firstVisit', false);
    },
    submitForm: function() {
      //check code against api
      ajax({
        url: ENV.APIRoutes['invites'],
        type: 'POST',
        data: {
          'invite': this.code
        }
      })
      .then((resp)=> {
        if (resp.permitted) {
          this.set('controllers.application.isVerified', true);
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
