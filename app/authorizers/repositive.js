import Ember from 'ember';
import Base from 'ember-simple-auth/authorizers/base';

const { isEmpty } = Ember;

export default Base.extend({
  authorize: function(sessionData, block) {
    if (!isEmpty(sessionData.token)) {
      //jqXHR.setRequestHeader('X-CSRF-Token', token);
      //jqXHR.crossDomain = true;
      //jqXHR.xhrFields = {withCredentials: true};
      block('authorization', `JWT ${sessionData.token}`);
    }
  }
});
