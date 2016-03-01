import Ember from 'ember';
let { Component, inject } = Ember;

/**
 * inject metrics into all components, routes and controllers.
 */
Component.reopen({
  metrics: inject.service()
});

export function initialize(application) {
  Ember.Component = Component;

  application.inject('route', 'metrics', 'service:metrics');
  application.inject('controller', 'metrics', 'service:metrics');
}

export default {
  name: 'tracking',
  after: 'metrics',
  initialize: initialize
};
