import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'a',
  isStarred:false,
  classNameBindings: ['isStarred:starred'],
  click: function(){
    this.toggleProperty("isStarred");
    if(this.get('isStarred')){
      this.get('metrics').trackEvent({
        category: 'dataset',
        action: 'favourite',
        label: this.get('dataset.id'),
        value: true
      });
    }else{
      this.get('metrics').trackEvent({
        category: 'dataset',
        action: 'favourite',
        label: this.get('dataset.id'),
        value: false
      });
    }
  }
});
