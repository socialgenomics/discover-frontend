import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo } from 'ember-data/relationships';

export default Model.extend({
  provider: attr('string'),
  email: attr('string'),
  user_id: attr('string'),
  verified: attr('boolean'),
  user: belongsTo('user'),
  created_at: attr('isodate'),
  updated_at: attr('isodate')
});
