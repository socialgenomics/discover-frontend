import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { inject as service } from '@ember/service';
import { belongsTo, hasMany } from 'ember-data/relationships';
import { get } from '@ember/object';
import computed from  'ember-macro-helpers/computed';

export default Model.extend({
  access: attr('string'),
  assay: attr('string'),
  createdAt: attr('isodate'),
  description: attr('string'),
  externalId: attr('string'),
  properties: attr('object'),
  _stats: attr('object'),
  tech: attr('string'),
  title: attr('string'),
  updatedAt: attr('isodate'),
  url: attr('string'),

  actions: hasMany('action'),
  collections: hasMany('collection', { inverse: 'datasets' }),
  subscriptions: hasMany('subscription'),
  datasourceId: belongsTo('collection', { inverse: 'owns' }),
  highlights: belongsTo('highlight'),
  userId: belongsTo('user'),

  accession: computed('externalId', function() {
    return get(this, 'externalId');
  }),
  stats: computed('_stats', 'favourites.favCounts', function (stats, favCounts) {
    return {
      ...stats,
      favourite: get(favCounts, get(this, 'id')) || 0
    };
  }),

  favourites: service(),
  init() {
    this._super(...arguments);
    // now send a request to get the number of favourites that exists
    get(this, 'favourites').getCount(get(this, 'id'))
  }
});
