import Ember from 'ember';
const { inject: { service }, Component } = Ember;

export default Component.extend({
  session: service(),
  favouritesService: service('favourites'),
  tagName: 'span',
  classNames: ['tag'],

  belongsToUser: Ember.computed('session', function () {
    const currentUserId = this.get('session.session.authenticated.user.id');
    const tagUserId = this.get('tag.userId.id');
    return tagUserId === currentUserId;
  }),
  actions: {
    deleteTag(tag) {
      tag.destroyRecord()
      .then(() => {
        this.get('flashMessages').add({
          message: 'Tag successfully deleted.',
          type: 'success',
          timeout: 7000,
          class: 'fadeInOut'
        });
      })
      .catch(err => {
        Ember.Logger.error(err);
      });
    }
  }
});
