import DS from 'ember-data';

export default DS.Model.extend({
  privacy: DS.attr('boolean'),
  notificationsInbox: DS.attr('boolean'),
  notificationsComments: DS.attr('boolean'),
  notificationsUpdates: DS.attr('boolean'),
  notificationsSuggestions: DS.attr('boolean')
});
