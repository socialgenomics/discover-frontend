import Ember from 'ember';
import searchMixin from 'repositive.io/packages/search/controllerMixin';


export default Ember.Controller.extend(searchMixin, {
  queryParams: ['q','ordering','assayType','tags','repository','accessType'],
  q: null,
  ordering: null,
  assayType: null,
  tags: null,
  repository: null,
  accessType: null,
  isModalShown:false,

  actions:{

    toggleModal(){
      this.toggleProperty('isModalShown');
    },

  }
});
