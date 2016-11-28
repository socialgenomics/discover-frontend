import Ember from 'ember';
const { Component, computed, inject: { service } } = Ember;

export default Component.extend({
  session: service(),
  isAuthenticated: computed.alias('session.isAuthenticated')
});
