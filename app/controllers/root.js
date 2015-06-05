import Ember from 'ember';

export default Ember.Controller.extend({
  isModalShown:false,
  actions:{
    toggleModal(){
      this.toggleProperty('isModalShown');
    },
  }
});
