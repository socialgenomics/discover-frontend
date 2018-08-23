import Service from '@ember/service';
import { inject as service } from '@ember/service';
import { get, set, observer } from '@ember/object';
import { debounce } from '@ember/runloop';
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

  observeUserId: observer('session.authenticatedUser.id', function () {
    if (get(this, 'session.authenticatedUser.id')) {
      this.refreshFavourites();
    }
  }),

  init() {
    this._super(...arguments);
    this.refreshFavourites();
  },

  refreshFavourites() {
    if (get(this, 'session.isAuthenticated')) {
      debounce(this, this.loadUserBookmarks, 50);
    } // else do nothing
  },


  loadUserBookmarks() {
    set(this, 'bookmarks', this._fetchBookmarks());
  },

  getFavourite(modelId) {
    return (get(this, 'bookmarks') || resolve([]))
      .then((bookmarks) => bookmarks.filter((b) => b.resource_id == modelId).pop());
  },

  async getCount(resource_id) {
    return get(this, 'ajax')
      .request(ENV.APIRoutes['new-bookmarks']['count-bookmarks'].replace('{id}', resource_id))
      .then(R.prop('result'));
  },

  async createFavorite(resource_id, resource_type) {
    try {
      const bookmarks = await get(this, 'bookmarks') || [];
      const currentUserId = get(this, 'session.authenticatedUser.id');
      const response = await this._createBookmark(resource_id, resource_type, currentUserId, 'user');
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

  async deleteFavourite(resource_id) {
    try {
      const bookmarks = await get(this, 'bookmarks') || [];
      const bookmark = bookmarks.filter((bookmark) => bookmark.resource_id === resource_id).pop();
      if (!bookmark) {
        throw new Error('There is no matching bookmark');
      }
      await this._deleteBookmark(bookmark.id);
      const newBookmarks = bookmarks.filter((b) => b.id !== bookmark.id);
      set(this, 'bookmarks', resolve(newBookmarks));
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

  _fetchBookmarks() {
    const currentUserId = get(this, 'session.authenticatedUser.id');
    return get(this, 'ajax')
      .request(`${ENV.APIRoutes['new-bookmarks']['view-bookmarks']}?owner_id=${currentUserId}`)
      .then(R.prop('result'))
      .then((bookmarks) =>
        // TODO one day we should changed that to let the service deal with it
        all(bookmarks.map((bookmark) => this._loadBookmarkResource(bookmark)))
      );
  },

  _loadBookmarkResource(bookmark) {
    const { resource_type, resource_id } = bookmark;
    const store = get(this, 'store');
    return store.findRecord(resource_type, resource_id)
      .then((resource) => {
        return { ...bookmark, resource };
      });
  }
});
