import Service from '@ember/service';
import { inject as service } from '@ember/service';
import { get, getWithDefault, set } from '@ember/object';
import {all, resolve } from 'rsvp';
import R from 'npm:ramda';
import ENV from 'repositive/config/environment';
import Ember from 'ember';
const {Logger} = Ember;

export default Service.extend({
  ajax: service(),
  store: service(),
  session: service(),
  flashMessages: service(),

  userFavourites: undefined, //list of actions where type = 'favourite'
  bookmarks: null,

  loadFavourites() {
    if (get(this, 'userFavourites') === undefined && get(this, 'session.isAuthenticated')) { //favourites haven't been loaded yet
      const currentUserId = get(this, 'session.session.authenticated.user.id');
      const store = get(this, 'store');

      return store.query('action', {
        'where.user_id': currentUserId,
        'where.type': 'favourite',
        limit: 1000
      })
        .then(favourites => {
          set(this, 'userFavourites', []);
          favourites.map(favourite => get(this, 'userFavourites').push(favourite));
        })
        .catch(Logger.error);
    }
  },
  fetchFavorites() {

  },

  removeFavourite(favourite) {
    set(this, 'userFavourites', get(this, 'userFavourites').without(favourite));
    this.notifyPropertyChange('userFavourites');
  },

  pushFavourite(favourite) {
    get(this, 'userFavourites').push(favourite);
    console.log('userFavourites -> ', get(this, 'userFavourites'));
    this.notifyPropertyChange('userFavourites');
  },

  getFavourite(modelId) {
    return (get(this, 'bookmarks') || resolve([]))
      .then((bookmarks) => bookmarks.filter((b) => b.resource_id == modelId).length > 0);
  },

  async createFavorite(resource_id, resource_type) {
    try {
      const bookmarks = await get(this, 'bookmarks') || [];
      const currentUserId = get(this, 'session.authenticatedUser.id');
      console.log('currentUserId -> ', currentUserId);
      const response = await this._createBookmark(resource_id, resource_type, currentUserId, 'user');
      console.log('response -> ', response);
      set(this, 'bookmarks', resolve([...bookmarks, response]));
      return response;
    } catch (err) {
      Logger.error(err);
      throw new Error("We couldn't create the bookmark. Try again later.");
    }
  },

  _createBookmark(resource_id, resource_type, owner_id, owner_type) {
    return get(this, 'ajax')
      .request(ENV.APIRoutes['new-bookmarks']['create-bookmark'], {
        method: 'POST',
        contentType: 'application/json',
        data: { resource_id, resource_type, owner_id, owner_type }
      })
      .then(R.prop('result'))
      .then((bookmark) => this._loadBookmarkResource(bookmark));
  },

  async deleteFavourite(resource_id, resource_type) {
    try {
      const bookmarks = await get(this, 'bookmarks') || [];
      console.log('bookmarks -> ', bookmarks);
      console.log('looking for this resource_id -> ', resource_id);
      const bookmark = bookmarks.filter((bookmark) => bookmark.resource_id === resource_id).pop();
      if (!bookmark) {
        throw new Error('There is no matching bookmark');
      }
      await this._deleteBookmark(bookmark.id);
      const newBookmarks = bookmarks.filter((b) => b.id !== bookmark.id);
      set(this, 'bookmarks', resolve(newBookmarks));
      console.log('updated bookmarks -> ', get(this, 'bookmarks'));
    } catch (err) {
      Logger.error(err);
      throw new Error("We couldn't delete the bookmark. Try again later.");
    }
  },

  _deleteBookmark(bookmark_id) {
    return get(this, 'ajax')
      .request(ENV.APIRoutes['new-bookmarks']['delete-bookmark'], {
        method: 'POST',
        contentType: 'application/json',
        data: { bookmark_id }
      });
  },

  _fetchCollections() {
    return get(this, 'ajax')
      .request(`${ENV.APIRoutes['new-bookmarks']['view-collections']}?owner_id=${get(this, 'organisationId')}`)
      .then(R.prop('result'));
  },

  _fetchBookmarks() {
    return get(this, 'ajax')
      .request(`${ENV.APIRoutes['new-bookmarks']['view-bookmarks']}?owner_id=${get(this, 'organisationId')}`)
      .then(R.prop('result'))
      .then((bookmarks) =>
        // TODO one day we should changed that to let the service deal with it
        all(bookmarks.map((bookmark) => this._loadBookmarkModel(bookmark)))
      ).then((bookmarks) =>
        // TODO
        all(bookmarks.map((bookmark) => this._loadBookmarkModelOwner(bookmark)))
      );
  },

  _loadBookmarkResource(bookmark) {
    const { resource_type, resource_id } = bookmark;
    const store = get(this, 'store');
    return store.findRecord(resource_type, resource_id)
      .then((resource) => {
        return { ...bookmark, resource };
      });
  },

  _loadBookmarkModelOwner(bookmark) {
    const ownerId = get(bookmark, 'model.organisation_id.value');
    if (ownerId) {
      return get(this, 'ajax').request(ENV.APIRoutes['organisation-profile'].replace('{id}', ownerId))
        .then(R.prop('result'))
        .then((model_owner) => {
          return { ...bookmark, model_owner };
        });
    } else {
      return bookmark;
    }
  }


});
