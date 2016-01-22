import Ember from 'ember';

export default Ember.Component.extend({
  avatar: function(){
    return this.get('user').get('profile.avatar');
  }.property('user')
});
