import Ember from 'ember';
import layout from 'ui-library/components/r-tab-list/template';

const { Component } = Ember;

export default Component.extend({
  layout,
  classNames: ['list-flush-left flex fc-primary ta-center mb0 r-tab-list'],
  tagName: 'ul'
});
