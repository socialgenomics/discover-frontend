import Ember from 'ember';

export default Ember.Controller.extend({
  queryparams: ['tab'],
  tab: 'comments',
  actions: {
    submit: function(){
      var controller = this;
      if (this.model.get('isDirty')){
        this.model.save().then(function(){
          controller.flashMessage('success', 'saved!');
        }).catch(function(){
          controller.flashMessage('error', 'no saved :(');
        });
      }
    }
  }
});
  
  
