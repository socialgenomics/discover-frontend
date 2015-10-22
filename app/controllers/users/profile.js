import Ember from "ember";

export default Ember.Controller.extend({
  saved:false,
  gravatar: function(){
    return this.get('model.profile.gravatar');
  }.property('model'),

  actions: {

      useGravatar: function() {
        this.set('model.profile.gravatar', true);
      },
      useAvatar: function() {
        this.set('model.profile.gravatar', false);
      },

      save:function(model){
        this.set('saved', true);

        this.get('model.user').save(),
        this.get('model.profile').save().then((model)=>{
          console.log(model + " SAVED");
        });
      },


      // save:function(){
      //   let user = this.get('model.user');
      //   let profile = this.get('model.profile');
      //
      //   user.save(),
      //   profile.save().then((values)=>{
      //     this.set('saved', true);
      //     return {
      //       user: values[0],
      //       profile: values[1].get('firstObject'),
      //     };
      //   })
      //   .catch((err)=>{
      //     Ember.Logger.error(err);
      //   });
      // },

      // this.get('model.user').save();
      // this.get('model.profile').save();
      // this.set('saved',true);
      // this.get('metrics').trackEvent({
      //   category: 'profile',
      //   action: 'request',
      //   value: this.get('currentUser')
      // });
  },
});
