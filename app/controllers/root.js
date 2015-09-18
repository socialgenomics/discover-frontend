import Ember from 'ember';

export default Ember.Controller.extend({
  // isShowingModal:false,
  // actions:{
  //   toggleModal(){
  //     console.log("modal rooooot");
  //     this.toggleProperty('isShowingModal');
  //   },
  // }
  isShowingModal: false,
  actions: {
    toggleModal: function() {
      this.toggleProperty('isShowingModal');
    }
  }
});
