import Ember from 'ember';

export default Ember.Controller.extend({
  title:null,
  description:null,

  actions:{
    addRequest:function(){
      var _this =this;
      var dataset = this.store.createRecord('dataset',{isRequest:true});
      var props = this.store.createRecord('property',{title:this.title,description:this.description,downloadURL:null});
      dataset.properties = props;
      calq.action.track(
        "Dataset.Request",
        {
          "title":this.title,
          "description":this.description,
        }
      );
      dataset.save().then(function(created){
        _this.flashMessage({
          content: 'Request posted successfully.', // String
          duration:3000, // Number in milliseconds
          type: 'Success', // String
        });

        _this.transitionToRoute('datasets.detail',created.id);
      });
    },

  }
});
