import Ember from 'ember';

import { createActionData } from 'repositive/utils/actions';

const { inject: { service }, Component, computed, isPresent, Logger, get, set } = Ember;

export default Component.extend({
  store: service(),
  session: service(),
  favouritesService: service('favourites'),

  tagName: 'li',
  classNames: ['fc-secondary', 'cursor-pointer' ],
  isSubmitting: false,
  showCreateAccountModal: false,

  isStarred: computed('favouritesService.userFavourites', function() {
    return isPresent(get(this, 'favouritesService').getFavourite(get(this, 'model.id')));
  }),

  mouseEnter() { set(this, 'isHovered', true); },
  mouseLeave() { set(this, 'isHovered', false); },
  click() { this.touchEnd(); },

  touchEnd() {
    const currentModel = this.model; //can be request or dataset
    const favourite = get(this, 'favouritesService').getFavourite(currentModel.id);
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
      if (favourite) {
        this._deleteFavourite(favourite);
      } else {
        this._addFavourite();
      }
    }
  },

  actions: {
    toggleCreateAccountModal() {
      this.toggleProperty('showCreateAccountModal');
    }
  },

  _addFavourite() {
    const currentModel = get(this, 'model'); //can be request or dataset
    const currentUser = get(this, 'session.authenticatedUser');
    const store = get(this, 'store');

    set(this, 'isSubmitting', true);

    return store
      .createRecord('action', createActionData(currentModel, currentUser, 'favourite'))
      .save()
      .then(savedFavourite => {
        get(this, 'favouritesService').pushFavourite(savedFavourite);
        set(this, 'isSubmitting', false);
        currentModel.incrementProperty('stats.favourite');
      })
      .catch(Logger.error);
  },

  _deleteFavourite(favourite) {
    const currentModel = get(this, 'model');
    set(this, 'isSubmitting', true);
    favourite.destroyRecord()
      .then(deletedFavourite => {
        set(this, 'isSubmitting', false);
        currentModel.decrementProperty('stats.favourite');
        get(this, 'favouritesService').removeFavourite(deletedFavourite);
        get(this, 'metrics').trackEvent({
          category: 'discover_homeauth_dataset',
          action: 'favourite',
          label: currentModel.id,
          value: false
        });
      })
      .catch(Logger.error);
  }
});
