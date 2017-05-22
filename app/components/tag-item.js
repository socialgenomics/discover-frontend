import Ember from 'ember';
import FlashMessageMixin from 'repositive/mixins/flash-message-mixin';

const { inject: { service }, Component, computed, get, Logger } = Ember;

export default Component.extend(FlashMessageMixin, {
  session: service(),
  classNames: ['t-tag-item', 'p2', 'bc-very-light-grey', 'mr2', 'mb2', 'rounded', 'border', 'u-hv-bc-very-light-grey', 'inline-block'],
  belongsToUser: computed('session', 'userId', function () {
    const currentUserId = get(this, 'session.session.authenticated.user.id');
    const tagUserId = get(this, 'userId');
    return tagUserId === currentUserId;
  }),

  tagQuery: computed('tagText', function() {
    return `${get(this, 'type')}:"${get(this, 'tagText')}"`;
  }),

  actions: {
    delete() {
      const tag = get(this, 'tag');
      if (tag) {
        tag.destroyRecord()
          .then(this._handleDeleteSuccess.bind(this))
          .catch(this._handleDeleteError.bind(this));
      } else {
        get(this, 'delete')(get(this, 'tagText'));
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
