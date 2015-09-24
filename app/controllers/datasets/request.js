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
      var dataset = this.store.createRecord('dataset',{isRequest:1});
      var props = this.store.createRecord('property', {
        title:this.title,
        description:this.description
      });
      dataset.properties = props;

      dataset
      .save()
      .then((created)=>{
        this.flashMessages.success('Request posted successfully.');
        this.transitionToRoute('datasets.detail',created.id);
        this.get('metrics').trackEvent({
          category: 'dataset',
          action: 'request',
          value: created.id
        });
      });
    },

  }
});
