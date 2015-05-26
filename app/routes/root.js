import Ember from 'ember';

export default Ember.Route.extend({

  model: function(){
    if (this.get('session').isAuthenticated){
      let stats = new Ember.RSVP.Promise(function(resolve, reject){
        Ember.$.ajax(
        {
          url:'/api/datasets/search',
          type:'GET',
        }
        )
        .then(
          function(resp){
            resolve(resp)
          },
          function(err){
            return console.log(err);
          }
        );
      });

      return Ember.RSVP.all([
        stats,
        this.store.find('dataset'),
      ])
      .then(
        function(data){
          return {
            stats: data[0],
            datasets: data[1],
          }
        }
      );
    }
    else {
      return null;
    }
    
  },

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
