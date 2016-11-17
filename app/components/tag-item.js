import Ember from 'ember';
const { inject: { service }, Component, computed, get, Logger } = Ember;

export default Component.extend({
  session: service(),
  tagName: 'span',
  classNames: ['tag'],
  belongsToUser: computed('session', function () {
    const currentUserId = get(this, 'session.session.authenticated.user.id');
    const tagUserId = get(this, 'tag.userId.id');
    return tagUserId === currentUserId;
  }),
  actions: {
    deleteTag(tag) {
      tag.destroyRecord()
      .then(() => {
        get(this, 'flashMessages').add({
          message: 'Tag successfully deleted.',
          type: 'success',
          timeout: 7000,
          class: 'fadeInOut'
        });
      })
      .catch(Logger.error);
    }
  }
});
