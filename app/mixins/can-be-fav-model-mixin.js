import Mixin from '@ember/object/mixin';
import { inject as service } from '@ember/service';
import { get } from '@ember/object';
import computed from  'ember-macro-helpers/computed';

export default Mixin.create({
  stats: {},
  statistics: computed('stats', 'collections.favCounts', function (stats, favCounts) {
    return {
      ...stats,
      favourite: get(favCounts, get(this, 'id')) || 0
    };
  }),

  collections: service(),
  init() {
    this._super(...arguments);
    // now send a request to get the number of collections that exists
    get(this, 'collections').getCount(get(this, 'id'))
  }
});
