import Ember from 'ember';
import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  model: function(params){
    return this.store.find('dataset', params.id);
  },
  afterModel: function(model){
    model.get('comments.@each.UserId').forEach((id)=>{
      this.store.query('profile', {UserId: id});
    });
  },
});
