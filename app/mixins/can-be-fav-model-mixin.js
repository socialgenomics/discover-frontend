import Mixin from '@ember/object/mixin';
import { inject as service } from '@ember/service';
import { get } from '@ember/object';
import computed from  'ember-macro-helpers/computed';

export default Mixin.create({
  _stats: {},
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
