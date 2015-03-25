import Ember from 'ember';
import Base from 'ember-validations/validators/base';
import Messages from 'ember-validations/messages';


export default Base.extend({
  message: null,
  isValid: true,
  init: function() {
    this._super();
    /*jshint expr:true*/
    if (this.options === true) {
      this.options = {};
    }
  },
  call: function() {
    if (this.message){
      this.errors.pushObject(this.message);
    }
  }.observes('message'),
});
