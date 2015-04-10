import Base from 'ember-validations/validators/base';


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
