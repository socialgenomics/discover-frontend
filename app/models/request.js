import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { inject as service } from '@ember/service';
import { belongsTo, hasMany } from 'ember-data/relationships';
import { get } from '@ember/object';
import computed from  'ember-macro-helpers/computed';

export default Model.extend({
  createdAt: attr('isodate'),
  description: attr('string'),
  _stats: attr('object'),
  title: attr('string'),
  isNHLBI: attr('boolean'),
  updatedAt: attr('isodate'),

  actions: hasMany('action'),
  subscriptions: hasMany('subscription'),
  userId: belongsTo('user'),

  stats: computed('_stats', function (stats) {
    return {
      ...stats,
      favourite: get(this, 'favourites').getCount(get(this, 'id'))
    };
  }),

  favourites: service()
});
