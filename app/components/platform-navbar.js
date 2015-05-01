import Ember from 'ember';

export default Ember.Component.extend({
  query:'',

  didInsertElement: function(){
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
