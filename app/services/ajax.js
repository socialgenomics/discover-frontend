import Ember from 'ember';
import AjaxService from 'ember-ajax/services/ajax';

const { inject: { service }, computed, get } = Ember;

export default AjaxService.extend({
  trustedHosts: [/api.*\.repositive\.io/],
  session: service(),
  headers: computed('session.session.content.authenticated.token', {
    get() {
      const authToken = get(this, 'session.session.content.authenticated.token');
      return authToken ? { authorization: `JWT ${authToken}` } : {};
    }
  })
});
