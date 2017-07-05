import DS from 'ember-data';
import attr from 'ember-data/attr';
import { belongsTo, hasMany } from 'ember-data/relationships';

const { Model } = DS;

export default Model.extend({
  active: attr('boolean'),
  subscribableModel: attr('string'),
  userId: belongsTo('user'),

  notifcations: hasMany('notification'),
  subscribableId: belongsTo('subscribable')
});
