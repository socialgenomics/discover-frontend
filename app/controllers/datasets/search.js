import Ember from 'ember';
import searchMixin from 'repositive/packages/search/controllerMixin';


export default Ember.Controller.extend(
  searchMixin,
  Ember.Evented,
{
  queryParams: ['q', 'ordering', 'assay', 'datasource', 'access'],
  q: null,
  ordering: null,
  assay: null,
  //tags: null,
  datasource: null,
  access: null,

  modelLoadingDidChange: function() {
    if (!this.get('model.isLoading')) {
      // The view subscribes to this function
      // so that it can call some jquery after the
      // model has finised rendering
      Ember.run.schedule('afterRender', this, ()=> {
        this.trigger('modelLoaded');
      });
    }
  }.observes('model.isLoading'),

  actions: {
    nextPage() {
      this.get('model').incrementProperty('offset', 30);
    }
  }
});
