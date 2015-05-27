import Ember from 'ember';

export default Ember.Controller.extend({
  title:null,
  description:null,
  actions:{
    addDataset:function(){
      var _this =this;
      var dataset = this.store.createRecord('dataset',{});
      //var props = dataset.get('properties').createRecord('property',{});
      var props = this.store.createRecord('property',{});

      props.title = this.title;
      props.description = this.description;
      dataset.properties = props;
      dataset.save().then(function(created){
        _this.transitionToRoute('datasets.detail',created.id);
      })
      // var datasetID = this.store.g
      //this.transitionToRoute('datasets.detail',dataset.id);
    },

  }
});
