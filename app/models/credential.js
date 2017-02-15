import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo } from 'ember-data/relationships';

export default Model.extend({
  createdAt: attr('isodate'),
  email: attr('string'),
  primary: attr('boolean'),
  provider: attr('string'),
  updatedAt: attr('isodate'),
  userId: belongsTo('user'),
  verified: attr('boolean')
});
