import Ember from 'ember';

const { Route, inject: { service }, get, set } = Ember;
export default Route.extend({
  session: service(),

  beforeModel() {
    set(this, 'session.data.firstVisit', false);
    if (get(this, 'session.data.firstVisit')) {
      this.transitionTo('root');
    }
  },

  model() {
    const user = get(this, 'session.session.content.authenticated.user');
    return {
      cred: get(user, 'credentials')[0],
      name: get(user, 'firstname') + ' ' + get(user, 'lastname')
    };
  }
});
