import Ember from 'ember';

const { Service, inject: { service }, get, Logger } = Ember;

export default Service.extend({
  store: service(),
  session: service(),

  getNotifications() {
    if (get(this, 'session.isAuthenticated')) {
      const currentUserId = get(this, 'session.session.authenticated.user.id');
      const store = get(this, 'store');
      return store.query('notification', {
        'where.user_id': currentUserId,
        'order[0][0]': 'created_at',
        'order[0][1]': 'DESC',
      })
        .then(notifications => {
          console.log(notifications);
        }).catch(Logger.error);
    }
  }
});
