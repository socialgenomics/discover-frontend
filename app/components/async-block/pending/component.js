import Component from '@ember/component';

export default Component.extend({
  tagName: '',
  promise: null
}).reopenClass({
  positionalParams: ['promise']
});
