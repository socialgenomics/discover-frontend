import Ember from 'ember';
import Base from 'ember-simple-auth/authorizers/base';

export default Base.extend({
  authorize: function(sessionData, block) {
    var token = this.get('session.secure.token');
    if (this.get('session.isAuthenticated') && !Ember.isEmpty(token)) {
      //jqXHR.setRequestHeader('X-CSRF-Token', token);
      //jqXHR.crossDomain = true;
      //jqXHR.xhrFields = {withCredentials: true};
      sessionData.setRequestHeader('x-access-token', token);
    }
  }
});
