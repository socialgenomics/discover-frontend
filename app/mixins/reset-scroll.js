import Ember from 'ember';
const { Mixin } = Ember;

export default Mixin.create({
  activate: function(){
    this._super();
    window.scrollTo(0,0);
  }
});
