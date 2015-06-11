import Ember from 'ember';

export default Ember.Component.extend({
  isActive:false,
  classNames:"add-comment",
  classNameBindings:['isActive:active'],
  comment:null,
  actions: {
    focusedIn:function(){
      this.set ("isActive", true);
    },
    // focusedOut:function(){
    //   this.set ("isActive", false);
    // },
    addComment:function(){
      this.sendAction('addComment',this.comment);
    },
  },
});
