import Ember from 'ember';

export default Ember.Component.extend({
  tag:null,
  isOpen:null,
  actions:{
    addTag:function(){

      if(this.tag){
        calq.action.track(
          "Dataset.AddTag",
          {"TagName":this.tag}
        );
        this.sendAction('addTag',this.tag);

      }
      this.set('tag',null);
      this.set('isOpen',true);
    },
    toggleInput:function(){
      this.toggleProperty('isOpen');
      this.sendAction('toggleEditTags');
    },
  },
});
