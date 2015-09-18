import Ember from 'ember';
import _ from 'npm:underscore';

export default Ember.Controller.extend({
  queryParams: ['assay', 'tags'],
  isShowingModal:false,
  actions:{
    toggleModal(){
      this.toggleProperty('isShowingModal');
    },
  }
});
