import Ember from 'ember';
import {isVerified} from './users/trust';

export default Ember.Route.extend({
  session: Ember.inject.service(),
  actionsService: Ember.inject.service('actions'),

  model: function(params) {
    if (this.get('session.session.isAuthenticated') === true) {
      return this.store.findRecord('user', params.id)
      .then(user => {
        const userId = user.get('id');
        return new Ember.RSVP.hash({
          user: user,
          user_profile: this.store.query('userProfile', { 'user_id': userId }),
          registrations: this.store.query('dataset', { 'user_id': userId }),
          requests: this.store.query('request', { 'user_id': userId }),
          user_credential: this.store.query('credential', { 'user_id': userId }),
          user_favourites: this.get('actionsService').loadFavourites(),
          favourited_data: this.get('actionsService').getFavouritedData(),
          user_comments: this.store.query('action', { user_id: userId, type: 'comment' })
        });
      })
      .then(values => {
        const numberOfComments = values.user_comments.get('content').length;
        this.controllerFor('user.index').set('numberOfComments', numberOfComments);
        return {
          user: values.user,
          user_profile: values.user_profile.get('firstObject'),
          registrations: values.registrations,
          requests: values.requests,
          is_verified: isVerified(values.user_credential)
        };
      })
      .catch(err => {
        Ember.Logger.error(err);
      });
    } else {
      this.transitionTo('/');
    }
  }
});
