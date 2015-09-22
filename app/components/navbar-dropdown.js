import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),
  currentUser: Ember.computed(function(){
    return this.get('session.secure.user');
  }),
  afterRenderEvent: function(){
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
  getAvatar: function() {
  	var store = this.get('data');

  	store.map(item => {
  		console.log(item.get('user.profile.avatar'));
    });
  },

  actions: {
    // getAvatar: function() {
      // console.log(this.get('profile.avatar.store'));
      // this.set('avatar', this.get('profile.avatar.store'));
      // return this.get('store').get('profile.avatar');
      // var store = this.get('profile');
      //
      // store.map(item => {
      //   console.log(item.get('avatar'));
      // });
    // },
    logout: function(){
      calq.action.track(
        "User.Logout"
      );
      this.get("session").invalidate();
    },
  }
});
