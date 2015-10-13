import Ember from 'ember';

export default Ember.Controller.extend({

  actions : {
    // user clicks button on welcome page to enter site
    enterSite: function() {
      this.set('firstVisit', false);
    }
  }
});
