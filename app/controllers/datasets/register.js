import Ember from 'ember';
import EmberValidations from 'ember-validations';

export default Ember.Controller.extend(EmberValidations.Mixin, {
  title:null,
  description:null,
  downloadURL:null,
  loading: false,
  validations:{
    title:{
      presence: true,
    },
    description:{
      presence: true,
    },
//    downloadURL:{
//      format: {
//        with: /[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/,
//        message: 'must be a valid url',
//      },
//    },
  },
  actions:{
    addDataset:function(){
      var _this = this;

      if (this.get('isValid')){

        this.set('loading', true)

        var dataset = this.store.createRecord('dataset',{});
        var props = this.store.createRecord('property',{
          title: this.title,
          description: this.description,
          downloadURL:this.downloadURL
        });
        dataset.properties = props;
        calq.action.track(
          "Dataset.Register",
          {
            "title":this.title,
            "description":this.description,
            "url":this.downloadURL
          }
        );
        dataset.save()
        .then(function(created){
          _this.flashMessage({
            content: 'Dataset successfully registered.', // String
            duration:3000, // Number in milliseconds
            type: 'Success', // String
          });


          _this.transitionToRoute('datasets.detail',created.id);
        })
        .catch(function(err){
          console.log(err);
          _this.set('loading', false)
        });
      }

    },

  }
});
