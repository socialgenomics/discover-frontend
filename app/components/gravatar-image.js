import Ember from 'ember';
import md5 from 'md5';

export default Ember.Component.extend({
  tagName: 'img',
  attributeBindings: ['src', 'alt', 'title', 'size:height', 'size:width'],
  size: 200,
  email: '',
  title: '',
  defaultImage: '',
  secure: true,
  retina: false,

  init: function() {
    this._super();
    this.sendAction();
  },

  currentUser: Ember.computed(function() {
    return this.get('session.secure.user');
  }),

  src: Ember.computed('email', 'imageSize', 'default', function() {
    var email = this.get('currentUser.email');
    var size = this.get('size');
    var def = this.get('defaultImage');
    var secure = this.get('secure');
    var protocol = secure ? 'https' : 'http';

    return protocol + '://www.gravatar.com/avatar/' + md5(email) + '?s=' + size + '&d=' + def;
  }),
});
