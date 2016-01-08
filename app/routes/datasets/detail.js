import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params) {
    return this.store.find('dataset', params.id);
  },
  afterModel: function(model) {
    model.get('comments.@each.UserId').forEach((id)=> {
      this.store.query('profile', { UserId: id });
    });
  }
});
