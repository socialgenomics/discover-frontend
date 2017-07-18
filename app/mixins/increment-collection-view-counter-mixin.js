import Ember from 'ember';
import { incrementViewCounter } from 'repositive/utils/actions';

const { Mixin, get } = Ember;

export default Mixin.create({
  viewedCollections: [],
  increment: incrementViewCounter,

  /**
   * @desc increments view counter for collection only onces per session
   * @param {Object} model
   */
  incrementCollectionsViewCounter(model) {
    const viewedCollections = get(this, 'viewedCollections');
    const collectionId = get(model, 'collection.id');

    if (viewedCollections.indexOf(collectionId) === -1) {
      this.increment(this.store, model.collection, get(this, 'session.authenticatedUser'));
      viewedCollections.push(collectionId);
    }
  }
});
