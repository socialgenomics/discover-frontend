import Ember from 'ember';

const { Service, inject: { service }, get, Logger, setProperties } = Ember;

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
        //fetch a dummy action
        const action = store.peekRecord('action', '27a21a60-0058-41c7-9f5f-f607729241d1');
        return notifications.map(notification => {
          setProperties(notification, {
            'properties.action': action,
            'properties.type': 'action'
          });
          return notification;
        });
      }).catch(Logger.error);
  }
});
