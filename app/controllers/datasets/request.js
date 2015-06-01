import Ember from 'ember';

export default Ember.Controller.extend({
  title:null,
  description:null,
  downloadURL:null,

  actions:{
    addRequest:function(){
      var _this =this;
      var dataset = this.store.createRecord('dataset',{});
      var props = this.store.createRecord('property',{title:this.title,description:this.description,downloadURL:this.downloadURL,isRequest:true});
      dataset.properties = props;

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
