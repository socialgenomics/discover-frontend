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
  isFirstPage: Ember.computed('model.offset', function(){
    const offset = this.get('model.offset');
    if (offset === undefined || offset === 0){
      return true;
    } else {
      return false;
    }
  }),

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
    previousPage() {
      this.set('model.isLoading', true);
      this.get('model.datasets').clear();
      this.get('model').decrementProperty('offset', 30);
    },

    nextPage() {
      this.set('model.isLoading', true);
      this.get('model.datasets').clear();
      this.get('model').incrementProperty('offset', 30);
    }
  }
});
