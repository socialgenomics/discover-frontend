import Ember from 'ember';
import searchMixin from 'repositive/packages/search/controllerMixin';


export default Ember.Controller.extend(searchMixin, {
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

  }
});
