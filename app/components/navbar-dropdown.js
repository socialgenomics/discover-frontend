import Ember from 'ember';
import ENV from 'repositive/config/environment';

export default Ember.Component.extend({
  avatar: null,
  currentUser: Ember.computed(function() {
    return this.get('session.secure.user');
  }),
  gravatar: Ember.computed(function() {
    return this.get('profile.gravatar');
  }),

  init: function() {
    this._super();
    this.sendAction();
  },

  afterRenderEvent: function() {
    //dropdown initialization
    this.$('.dropdown-button').dropdown({
      inDuration: 500,
      outDuration: 225,
      constrain_width: false, // Does not change width of dropdown to that of the activator
      hover: false, // Activate on click
      alignment: 'right', // Aligns dropdown to left or right edge (works with constrain_width)
      gutter: 0, // Spacing from edge
      belowOrigin: true // Displays dropdown below the button
    });
  },

  actions: {

    logout: function(){
      this.get('metrics').trackEvent({
        category: 'auth',
        action: 'logout',
        label: this.get('currentUser.email'),
      });
      this.get("session").invalidate();
    },

  }

});
