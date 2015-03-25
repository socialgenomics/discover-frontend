import Ember from 'ember';

export default Ember.Route.extend({
  setupController: function(){
    if (this.get('session').isAthenticated){
      this.set('controllerName', 'homePage');
    }
    else {
      this.set('controllerName', 'landingPage');
    }
  }
//  renderTemplate: function() {
//    this.render('home');
//    if (this.get('session').isAuthenticated){
//      // TODO: this template is not found for some reason
//      this.render('homePage');
//    } else {
//      this.render('landingPage');
//    }
//  }
});
