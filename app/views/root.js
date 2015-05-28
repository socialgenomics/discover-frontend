import Ember from 'ember';

export default Ember.View.extend({
  didInsertElement: function(){
    //dropdown initialization
    var _this = this;
    this._super();
    Ember.run.scheduleOnce('afterRender', this, function(){
      this.$('.dropdown-button').dropdown({
        inDuration: 500,
        outDuration: 225,
        constrain_width: false, // Does not change width of dropdown to that of the activator
        hover: false, // Activate on click
        alignment: 'right', // Aligns dropdown to left or right edge (works with constrain_width)
        gutter: 0, // Spacing from edge
        belowOrigin: true // Displays dropdown below the button
      });
    });
  },
});
