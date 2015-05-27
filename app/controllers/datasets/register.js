import Ember from 'ember';

export default Ember.Controller.extend({
  title:null,
  description:null,
  actions:{
    addDataset:function(){

      var dataset = this.store.createRecord('dataset',{});
      //var props = dataset.get('properties').createRecord('property',{});
      var props = this.store.createRecord('property',{});
      var repo = this.store.createRecord('property',{});

      props.title = this.title;
      props.description = this.description;
      dataset.properties = props;
      dataset.save();

      // console.log(this.title);
      // var dataset = this.store.createRecord('dataset', {
      //   properties:{
      //     title:this.title,
      //     description:this.description,
      //   },
      // });
      // dataset.save();
    },
  }
});
