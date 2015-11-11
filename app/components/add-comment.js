import Ember from 'ember';

let { isEmpty } = Ember;

export default Ember.Component.extend({
  isActive:false,
  isValid:false,
  classNames:"write-comment",
  classNameBindings:['isActive:active'],
  comment:null,
  avatar: null,
  currentUser: Ember.computed(function() {
    return this.get('session.secure.user');
  }),

  init: function() {
    this._super();
    this.sendAction();
  },
  actions: {
    focusedIn:function(){
      this.set("isActive", true);
    },
    cancel:function(){
      this.set('isActive',false);
      this.set('comment', null);
    },
    addComment:function(){
      //temporary validation
      if(!isEmpty(this.get('comment'))){
        this.get('metrics').trackEvent({
          category: 'dataset',
          action: 'comment',
          label: this.get('dataset.id'),
        });
        this.sendAction('addComment',this.comment);
      }
      this.send('cancel');
    },
  },
});
