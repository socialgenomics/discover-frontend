import DS from 'ember-data';
import attr from 'ember-data/attr';
import { belongsTo, hasMany } from 'ember-data/relationships';

export default DS.Model.extend({
  active: attr('boolean'),
  notifcations: hasMany('notification'),
  subscribableModel: attr('string'),
  subscribableId: belongsTo('subscribable'),
  userId: belongsTo('user')
});