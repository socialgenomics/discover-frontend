import Ember from 'ember';

const { Route, inject: { service }, get, set } = Ember;
export default Route.extend({
  session: service(),
  ajax: service(),

  beforeModel() {
    set(this, 'session.data.firstVisit', false);
  },

  model() {
    const user = get(this, 'session.session.content.authenticated.user');
    return {
      cred: get(user, 'credentials')[0],
      name: get(user, 'firstname') + ' ' + get(user, 'lastname'),
      RGScript: this._buildRGTrackingScript()
    };
  },

  _buildRGTrackingScript() {
    const a = Math.random() * 10000000000000;
    return `
      <img src="https://pubads.g.doubleclick.net/activity;xsp=251559;ord=1;num=${a}?" width=1 height=1 border=0/>
      <noscript>
        <img src="https://pubads.g.doubleclick.net/activity;xsp=251559;ord=1;num=1?" width=1 height=1 border=0/>
      </noscript>
    `;
  }
});
