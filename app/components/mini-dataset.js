import Ember from 'ember';

export default Ember.Component.extend({
  classNameBindings:['dataset.isRequest:request']
});
