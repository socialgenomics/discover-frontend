import Ember from 'ember';
import EmberValidations from 'ember-validations';

export default Ember.Controller.extend(
  EmberValidations,
{
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
      var dataset = this.store.createRecord('dataset',{isRequest:1});
      var props = this.store.createRecord('property', {
        title:this.title,
        description:this.description
      });
      dataset.properties = props;
      calq.action.track(
        "Dataset.Request",
        {
          "title":this.title,
          "description":this.description,
        }
      );
      dataset.save().then(function(created){
        _this.flashMessages.success('Request posted successfully.');
        _this.transitionToRoute('datasets.detail',created.id);
      });
    },

  }
});
