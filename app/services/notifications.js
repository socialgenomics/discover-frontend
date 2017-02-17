import Ember from 'ember';

const { Service, inject: { service }, get, Logger } = Ember;

export default Service.extend({
  store: service(),

  getNotifications(userId) {
    const store = get(this, 'store');
    return store.query('notification', {
      'where.user_id': userId,
      'order[0][0]': 'created_at',
      'order[0][1]': 'DESC'
    })
      .then(notifications => {
        return notifications;
      }).catch(Logger.error);
  }
});
