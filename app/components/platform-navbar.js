import Ember from 'ember';

export default Ember.Component.extend({
  query:'',

  autocomplete: function(){
    console.log(this.get('query'));
  }.observes('query'),

  actions:{

    search: function(){
      calq.action.track(
        "Search.Query",
        { "Query": this.get("query")}
      );
      this.sendAction('action', this.get("query"));
    },

  }
});
