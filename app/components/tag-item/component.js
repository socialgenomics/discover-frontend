import Ember from 'ember';
import FlashMessageMixin from 'repositive/mixins/flash-message-mixin';

const { inject: { service }, Component, computed, get } = Ember;

export default Component.extend(FlashMessageMixin, {
  session: service(),

  classNames: ['t-tag-item', 'white-space-nowrap', 'p2', 'bc-very-light-grey', 'mr2', 'rounded', 'border', 'u-hv-bc-very-light-grey', 'inline-block'],
  classNameBindings: ['isMultiLine:mb2'],
  isMultiLine: computed('type', function() {
    const type = get(this, 'type');
    return type === 'tag' || type === 'interest';
  }),
  belongsToUser: computed('session', 'userId', function () {
    const currentUserId = get(this, 'session.session.authenticated.user.id');
    const tagUserId = get(this, 'userId');
    return tagUserId === currentUserId;
  }),

  isRemovable: computed('belongsToUser', 'type', function() {
    return get(this, 'belongsToUser') || get(this, 'type') === 'predicate';
  }),

  tagQuery: computed('tagText', function() {
    return `${get(this, 'type')}:"${get(this, 'tagText')}"`;
  }),

  actions: {
    delete() {
      const tag = get(this, 'tag');
      if (tag) {
        return get(this, 'deleteAction')(tag);
      } else {
        get(this, 'delete')(get(this, 'tagText'));
      }
    }
  }
});
