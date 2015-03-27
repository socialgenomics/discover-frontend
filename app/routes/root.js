import Ember from 'ember';

export default Ember.Route.extend({
//  setupController: function(){
//    if (this.get('session').isAthenticated){
//      this.set('controllerName', 'homePage');
//    }
//    else {
//      this.set('controllerName', 'landingPage');
//    }
//  }

  renderTemplate: function() {
    if (this.get('session').isAuthenticated){
      this.render('homePage', {
        controller: 'homePage',
      });
    } else {
      this.render('landingPage', {
        controller: 'landingPage',
      });
    }
  }
});
