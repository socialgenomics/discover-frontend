import Ember from 'ember';

const { Component } = Ember;

export default Component.extend({
  tagName: 'header',
  classNames: ['grid__col grid__col--3-of-3', 'u-bc-overlay', 'u-ta-center']
});
