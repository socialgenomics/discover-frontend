import Ember from 'ember';
import searchMixin from 'repositive/packages/search/controllerMixin';


export default Ember.Controller.extend(
  searchMixin,
  Ember.Evented,
{
  queryParams: ['q','ordering','assayType','tags','repository','access'],
  q: null,
  ordering: null,
  assayType: null,
  tags: null,
  repository: null,
  access: null,
  isModalShown:false,

  actions:{

    toggleModal(){
      this.toggleProperty('isModalShown');
    },

  },
  modelLoadingDidChange: function(){
    if (!this.get('model.isLoading')){
      Ember.run.schedule('afterRender', this, ()=>{
        this.trigger('modelLoaded');
      });
    }
  }.observes('model.isLoading')
});
