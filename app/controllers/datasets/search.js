import Ember from 'ember';
import FilterActions from 'repositive.io/modules/search/mixin';


export default Ember.Controller.extend(FilterActions, {
  queryParams: ['q','ordering','assayType','tags','repository','accessType'],
  q: null,
  ordering: null,
  assayType: null,
  tags: null,
  accessType: null,
  isModalShown:false,

  actions:{

    toggleModal(){
      this.toggleProperty('isModalShown');
    },

  }
});
