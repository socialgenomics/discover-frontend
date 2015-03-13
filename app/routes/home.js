import Ember from 'ember';

export default Ember.Route.extend({
  renderTemplate: function() {
    this.render('home')
//    if (this.get('session').isAuthenticated){
//      // TODO: this template is not found for some reason
//      this.render('homePage');
//    } else {
//      this.render('landingPage');
//    }
  }
});
