import Ember from 'ember';
const { inject: { service }, Component } = Ember;

export default Component.extend({
  session: service(),
  actionsService: service('actions'),
  tagName: 'span',
  classNames: ['tag'],

  belongsToUser: Ember.computed('session', function () {
    const currentUserId = this.get('session.session.authenticated.user.id');
    const tagUserId = this.get('tag.userId.id');
    return tagUserId === currentUserId;
  })
});
