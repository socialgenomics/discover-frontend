import Ember from 'ember';

const { Route, inject: { service }, get, set, Logger } = Ember;
export default Route.extend({
  session: service(),
  ajax: service(),

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
  },

  actions: {
    willTransition() { this._incrementResearchGateCounter(); }
  },

  _incrementResearchGateCounter() {
   // Tracking script for Research Gate
    const a = Math.random() * 10000000000000;
    get(this, 'ajax')
      .raw(`https://pubads.g.doubleclick.net/activity;xsp=251559;ord=1;num=${a}?`, {
        'method': 'GET'
      }).catch(Logger.warn)
  }
});
