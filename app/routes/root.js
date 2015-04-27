import Ember from 'ember';

export default Ember.Route.extend({

  renderTemplate: function() {
    if (this.get('session').isAuthenticated){
      this.render('homePage', {
        controller: 'homePage',
      });
    }
    else {
      this.render('landingPage', {
        controller: 'landingPage',
      });
    }
  },

  actions:{
  }
});
