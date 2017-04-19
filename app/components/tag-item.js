import Ember from 'ember';
import FlashMessageMixin from 'repositive/mixins/flash-message-mixin';

const { inject: { service }, Component, computed, get, Logger } = Ember;

export default Component.extend(FlashMessageMixin, {
  session: service(),

  tagName: 'span',
  classNames: ['u-p1', 'u-bc-off-white', 'u-mr1', 'u-mb1', 'u-rounded', 'u-border', 'u-hv-bc-off-white', 'u-inline-block'],

  belongsToUser: computed('session', function () {
    const currentUserId = get(this, 'session.session.authenticated.user.id');
    const tagUserId = get(this, 'tag.userId.id');
    return tagUserId === currentUserId;
  }),

  tagQuery: computed('tagText', function() {
    return `tag:"${get(this, 'tagText')}"`;
  }),

  actions: {
    deleteTag(tagText) {
      const tag = get(this, 'tag');
      if (tag) {
        tag.destroyRecord()
          .then(this._handleDeleteSuccess.bind(this))
          .catch(this._handleDeleteError.bind(this));
      } else {
        get(this, 'deleteTag')(tagText);
      }
    }
  },
  _handleDeleteSuccess() {
    this._addFlashMessage('Tag successfully deleted.', 'success');
  },
  _handleDeleteError(error) {
    this._addFlashMessage('Something went wrong while deleting your tag. Please try again later.', 'warning');
    Logger.error(error)
  }
});
