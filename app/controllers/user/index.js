import Ember from 'ember';

export default Ember.Controller.extend({
  requests:function(){
    var usr= this.get('model.user.id')
    var datasets = this.get('model.datasets');
    return datasets.filterBy('isRequest',true);
  }.property('isRequest'),
});
