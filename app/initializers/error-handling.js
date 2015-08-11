import Ember from 'ember';

export function initialize(/* container, application */) {
  Ember.onerror = function(error) {
    Ember.$.ajax('/api/logging', {
      type: 'POST',
      data: {
        stack: error.stack,
      }
    });
  }
}

export default {
  name: 'error-handling',
  initialize: initialize
};
