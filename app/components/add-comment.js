import Ember from 'ember';

export default Ember.Component.extend({
  isActive:false,
  isValid:false,
  classNames:"write-comment",
  classNameBindings:['isActive:active'],
  comment:null,

  actions: {
    initAvatar: function(){
      this.sendAction("initAvatar")
    },
    focusedIn:function(){
      this.set ("isActive", true);
    },
    cancel:function(){
      this.set('isActive',false);
      this.set('comment', null);
    },
    addComment:function(){
      //temporary validation
      if(this.comment){
        this.get('metrics').trackEvent({
          category: 'dataset',
          action: 'comment',
          label: this.get('dataset.id'),
          value: this.comment
        });
        this.sendAction('addComment',this.comment);
      }
      this.send('cancel');
    },
  },
});
