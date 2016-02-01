import Ember from 'ember';

export default Ember.Component.extend({
  session: Ember.inject.service(),
  //currentUser: Ember.computed.alias('session.data.authenticatedUser.profile.avatar'),
  firstname: Ember.computed.alias('session.data.authenticatedUser.firstname'),
  username: Ember.computed.alias('session.data.authenticatedUser.username'),
  avatar: Ember.computed('session.data.authenticatedUser', function() {
    return this.store.findRecord('profile', this.get('session.data.authenticatedUser.ProfileId')).get('avatar');
  }),

  didRender() {
    this._super(...arguments);
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
    logout: function() {
      this.get('metrics').trackEvent({
        category: 'auth',
        action: 'logout',
        label: this.get('session.data.authenticatedUser.email')
      });
      this.get('session').invalidate();
    }
  }

});
