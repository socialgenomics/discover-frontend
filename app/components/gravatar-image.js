import Ember from 'ember';

export default Ember.Component.extend({
  size: 200,
  email: '',
  currentUser: Ember.computed(function() {
    return this.get('session.secure.user');
  }),

  gravatarUrl: Ember.computed('email', 'size', function() {
    var email = this.get('currentUser.email'),
    size = this.get('size');

    return 'http://www.gravatar.com/avatar/' + md5(email) + '?s=' + size;
  })
});
