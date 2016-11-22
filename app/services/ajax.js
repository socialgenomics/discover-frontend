import Ember from 'ember';
import AjaxService from 'ember-ajax/services/ajax';

const { inject: { service }, computed, get } = Ember;

export default AjaxService.extend({
  session: service(),
  headers: computed('session.authToken', {
    get() {
      let headers = {};
      const authToken = get(this, 'session.session.content.authenticated.token');
      if (authToken) {
        headers['authorization'] = `JWT ${authToken}`;
      }
      return headers;
    }
  })
});
