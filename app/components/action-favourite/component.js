import Ember from 'ember';

// import { createActionData } from 'repositive/utils/actions';

const { inject: { service }, Component, computed, Logger, get, set } = Ember;

export default Component.extend({
  store: service(),
  session: service(),
  collectionsService: service('collections'),

  tagName: 'li',
  classNames: ['fc-secondary', 'cursor-pointer' ],
  isSubmitting: false,
  showCreateAccountModal: false,


  //data props
  model: null,
  modelType: null,

  isStarred: computed('collectionsService.bookmarks', function() {
    return get(this, 'collectionsService')
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
    const collectionsService = get(this, 'collectionsService');

    set(this, 'isSubmitting', true);

    return collectionsService.createFavorite(get(currentModel, 'id'), modelType)
      .then(() => this._handleSaveSuccess(currentModel))
      .catch(Logger.error)
  },

  _deleteFavourite() {
    const currentModel = get(this, 'model');
    // const modelType = get(this, 'modelType');
    const collectionsService = get(this, 'collectionsService');

    set(this, 'isSubmitting', true);
    return collectionsService.deleteFavourite(get(currentModel, 'id'))
      .then(() => this._handleDeleteSuccess(currentModel))
      .catch(Logger.error);
  },

  _handleSaveSuccess() {
    set(this, 'isSubmitting', false);
  },

  _handleDeleteSuccess(currentModel) {
    set(this, 'isSubmitting', false);
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
