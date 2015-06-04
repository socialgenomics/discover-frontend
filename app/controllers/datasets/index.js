import Ember from 'ember';
import _ from 'npm:underscore';

export default Ember.Controller.extend({
  queryParams: ['assay', 'tags'],
  isModalShown:false,
  actions:{
    toggleModal(){
      this.toggleProperty('isModalShown');
    },
  }
});
