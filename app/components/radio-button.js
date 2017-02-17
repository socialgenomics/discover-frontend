import Ember from 'ember';

const { Component, computed } = Ember;

export default Component.extend({
  classNames: ['u-block u-mb1 u-ta-left'],
  classNameBindings: ['checked']
});
