import Ember from 'ember';

export default Ember.Controller.extend({
  title:null,
  description:null,
  actions:{
    addDataset:function(){
      // var dataset= this.store.createRecord('dataset',{});
      // dataset.get('properties').addObject(this.store.createRecord('property',{
      //   title:this.title,
      //   description:this.description
      // }));
      // dataset.save();
      var dataset = this.store.createRecord('dataset',{});
      var props = dataset.createdAt;
      console.log(props);
      var props = dataset.get('properties').createRecord('property',{});
      props.title = this.title;
      props.description = this.description;
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
