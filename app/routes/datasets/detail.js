import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params){
    return this.store.find('dataset', params.id);
  },
  // setupController:function(controller,model){
  //   this._super(controller,model);
  //   controller.set('comments',this.store.find('comment',{}))
  //   //var currentUser = this.get('session.user');
  //   //controller.set('user',this.store.find('user', currentUser.id));
  // },

});
