import Ember from 'ember';

export default Ember.Component.extend({
  query: '',
  autocomplete: function() {
    console.log(this.get('query'));
  }.observes('query'),

  actions: {
    search: function() {
      debugger;
      console.log('HERE I AM!');
      this.sendAction('action', this.get('query'));
      debugger;
    }
  }
});
