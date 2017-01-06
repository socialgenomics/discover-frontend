import Ember from 'ember';

const { Mixin, get } = Ember;

export default Mixin.create({
  viewedCollections: [],

  /**
   * @desc increments view counter for collection only onces per session
   * @param {Object} model
   */
  incrementCollectionsViewCounter(model) {
    const viewedCollections = get(this, 'viewedCollections');
    const collectionId = get(model, 'collection.id');

    if (viewedCollections.indexOf(collectionId) === -1) {
      this._incrementViewCounter(model.collection, get(this, 'session.authenticatedUser'));
      viewedCollections.push(collectionId);
    }
  }
});
