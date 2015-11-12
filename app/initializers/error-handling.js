import Ember from 'ember';
import ENV from 'repositive/config/environment';
import ajax from 'ic-ajax';

export function initialize(/* container, application */) {
  if (ENV.environment === 'production') {
    Ember.onerror = function(error) {
      ajax('/api/logging', {
        type: 'POST',
        data: {
          stack: error.stack
        }
      });
    };
  }
}

export default {
  name: 'error-handling',
  initialize: initialize
};
