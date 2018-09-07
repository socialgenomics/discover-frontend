import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo, hasMany } from 'ember-data/relationships';

import CanBeFavMixin from 'repositive/mixins/can-be-fav-model-mixin';

export default Model.extend(CanBeFavMixin, {
  createdAt: attr('isodate'),
  description: attr('string'),
  _stats: attr('object'),
  title: attr('string'),
  isNHLBI: attr('boolean'),
  updatedAt: attr('isodate'),

  actions: hasMany('action'),
  subscriptions: hasMany('subscription'),
  userId: belongsTo('user')
});
