import Ember from 'ember';

export default Ember.Component.extend({
  query:'',
  currentUser: Ember.computed(function(){
    return this.get('session.user');
  }),


  autocomplete: function(){
    console.log(this.get('query'));
  }.observes('query'),

  actions:{

    logout: function(){
      this.get("session").invalidate();
    },

    search: function(){
      this.sendAction('action', this.get("query"));
    },

  }
});
