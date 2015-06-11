import Ember from 'ember';

export default Ember.Component.extend({
  isActive:false,
  classNames:"write-comment",
  classNameBindings:['isActive:active'],
  comment:null,
  actions: {
    focusedIn:function(){
      this.set ("isActive", true);
    },
    cancel:function(){
      this.set('isActive',false);
      this.set('comment', null);
    },
    addComment:function(){
      this.sendAction('addComment',this.comment);
      this.send('cancel');
    },
  },
});
