import Ember from 'ember';
import EmberValidations from 'ember-validations';

export default Ember.Controller.extend(EmberValidations.Mixin, {
  title:null,
  description:null,
  validations:{
    title:{
      presence: true,
    },
    description:{
      presence: true,
    },
  },
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
