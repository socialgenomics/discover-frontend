import Em from 'ember';
import FormGroupComponent from './em-form-group';
import FormCheckboxComponent from './em-checkbox';
import ControlMixin from 'repositive.io/mixins/control';

/*
Form Input

Syntax:
{{em-checkbox property="property name"}}
 */
export default FormGroupComponent.extend({
  v_icons: false,
  validations: false,
  yieldInLabel: true,
  controlView: Em.Checkbox.extend(ControlMixin, {
    "class": false,
    model: Em.computed.alias('parentView.parentView.model'),
    propertyName: Em.computed.alias('parentView.parentView.propertyName'),
    init: function() {
      this._super();
      return Em.Binding.from("model." + (this.get('propertyName'))).to('checked').connect(this);
    }
  }),
  wrapperClass: (function() {
    if (this.get('form.form_layout') === 'horizontal') {
      return 'col-sm-offset-2 col-sm-10';
    }
  }).property('form.form_layout'),
  labelWrapperClass: (function() {
    if (this.get('form.form_layout') === 'horizontal') {
      return 'checkbox';
    }
    return null;
  }).property('form.form_layout'),
  "class": (function() {
    if (this.get('form.form_layout') !== 'horizontal') {
      return 'checkbox';
    }
    return 'form-group';
  }).property('form.form_layout')
});
