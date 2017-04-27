import Ember from 'ember';
const { inject: { service }, Component, computed, get, Logger } = Ember;

export default Component.extend({
  session: service(),
  tagName: 'span',
  classNames: ['p2', 'u-bc-off-white', 'mr2', 'mb2', 'u-rounded', 'u-border', 'u-hv-bc-off-white', 'u-inline-block'],
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
          type: 'success'
        });
      })
      .catch(Logger.error);
    }
  }
});
