import {Route} from '@ember/routing';
import {inject as service} from '@ember/service';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Route.extend(AuthenticatedRouteMixin,{
  favourites: service(),

  redirectionURL: '/',


  model() {
    const {id: userId} = this.modelFor('user');
    // side-load the bookmarks
    favourites.loadSomeonesBookmarks(userId);
    return userId
  }
});
