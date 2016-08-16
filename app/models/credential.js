import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo } from 'ember-data/relationships';

export default Model.extend({
  provider: attr('string'),
  email: attr('string'),
  userId: belongsTo('user'),
  primary: attr('boolean'),
  verified: attr('boolean'),
  createdAt: attr('isodate'),
  updatedAt: attr('isodate')
});
