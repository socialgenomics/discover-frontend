import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo } from 'ember-data/relationships';

export default Model.extend({
  isPublic: attr('boolean'),
  notificationInbox: attr('boolean'),
  notificationComment: attr('boolean'),
  notificationUpdate: attr('boolean'),
  notificationSuggestion: attr('boolean'),
  userId: belongsTo('user')
});
