import Ember from 'ember';

// import { createActionData } from 'repositive/utils/actions';

const { inject: { service }, Component, computed, Logger, get, set } = Ember;

export default Component.extend({
  store: service(),
  session: service(),
  favouritesService: service('favourites'),

  tagName: 'li',
  classNames: ['fc-secondary', 'cursor-pointer' ],
  isSubmitting: false,
  showCreateAccountModal: false,


  //data props
  model: null,
  modelType: null,

  isStarred: computed('favouritesService.bookmarks', function() {
    return get(this, 'favouritesService')
      .getFavourite(get(this, 'model.id'), get(this, 'model.constructor.modelName'));
  }),

  actions: {
    toggleCreateAccountModal() {
      this.toggleProperty('showCreateAccountModal');
    }
  },

  mouseEnter() { set(this, 'isHovered', true); },
  mouseLeave() { set(this, 'isHovered', false); },
  click() { this.touchEnd(); },

  touchEnd() {
    const currentModel = this.model; //can be request or dataset
    const favourite = get(this, 'favouritesService')
      .getFavourite(currentModel.id, get(currentModel, 'constructor.modelName'));

    if (get(this, 'session.isAuthenticated')) {
      get(this, 'metrics').trackEvent({
        category: 'discover_homeauth_dataset',
        action: 'favourite',
        label: currentModel.id,
        value: true
      });
    } else {
      this.send('toggleCreateAccountModal');
      get(this, 'metrics').trackEvent({
        category: 'discover_openpage_dataset',
        action: 'attempted favourite',
        label: currentModel.id,
        value: true
      });
      return;
    }
    if (!get(this, 'isSubmitting')) {
      return get(this, 'isStarred').then((isStarred) => isStarred ? this._deleteFavourite() : this._addFavourite());
    }
  },

  _addFavourite() {
    const currentModel = get(this, 'model'); //can be request or dataset
    const modelType = get(this, 'modelType');
    const favouritesService = get(this, 'favouritesService');

    set(this, 'isSubmitting', true);

    return favouritesService.createFavorite(get(currentModel, 'id'), modelType)
      .then((newFav) => this._handleSaveSuccess(currentModel, newFav))
      .catch(Logger.error)
  },

  _deleteFavourite() {
    const currentModel = get(this, 'model');
    // const modelType = get(this, 'modelType');
    const favouritesService = get(this, 'favouritesService');

    set(this, 'isSubmitting', true);
    return favouritesService.deleteFavourite(get(currentModel, 'id'))
      .then(this._handleDeleteSuccess.bind(this, currentModel))
      .catch(Logger.error);
  },

  _handleSaveSuccess(currentModel, savedFavourite) {
    set(this, 'isSubmitting', false);
    console.log('savedFavourite -> ', savedFavourite);
    set(this, 'favorite', savedFavourite);
    console.warn('change the next line')
    currentModel.incrementProperty('stats.favourite');
  },

  _handleDeleteSuccess(currentModel, deletedFavourite) {
    set(this, 'isSubmitting', false);
    currentModel.decrementProperty('stats.favourite');
    get(this, 'favouritesService').removeFavourite(deletedFavourite);
    get(this, 'metrics').trackEvent({
      category: 'discover_homeauth_dataset',
      action: 'favourite',
      label: currentModel.id,
      value: false
    });
  }
}).reopenClass({
  positionalParams: ['model', 'modelType']

});
