import Ember from 'ember';

export default Ember.Component.extend({
  tag:null,
  isOpen:false,
  actions:{
    addTag:function(){
      if(this.tag !== ""){
        calq.action.track(
          "Dataset.AddTag",
          {"TagName":this.tag}
        );
        this.sendAction('addTag',this.tag);
      }
      this.set('tag',null);
    },
    toggleInput:function(){
      this.toggleProperty('isOpen');
    },
  },
});
