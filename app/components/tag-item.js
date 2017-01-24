import Ember from 'ember';
const { inject: { service }, Component, computed, get, Logger } = Ember;

export default Component.extend({
  session: service(),
  tagName: 'span',
  classNames: ['c-pill', 'u-mb2', 'u-mr1'],
  belongsToUser: computed('session', function () {
    const currentUserId = get(this, 'session.session.authenticated.user.id');
    const tagUserId = get(this, 'tag.userId.id');
    return tagUserId === currentUserId;
  }),
  tagQuery: computed('tag.properties.text', function() {
    return `tag:"${get(this, 'tag.properties.text')}"`;
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
