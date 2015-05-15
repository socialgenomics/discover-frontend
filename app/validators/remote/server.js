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
    if (this.get('message')){
      this.errors.pushObject(this.get('message'));
    }
    this.set('message', null);
  }.observes('message'),
});
