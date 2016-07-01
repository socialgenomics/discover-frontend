import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo } from 'ember-data/relationships';

export default DS.Model.extend({
  is_public: attr('boolean'),
  notification_inbox: attr('boolean'),
  notification_comment: attr('boolean'),
  notification_update: attr('boolean'),
  notification_suggestion: attr('boolean'),
  user_id: attr('string'),
  user: belongsTo('user')
});
