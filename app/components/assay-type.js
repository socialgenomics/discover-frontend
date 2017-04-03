import Ember from 'ember';
import colours from '../utils/colours';

const { Component, computed, get } = Ember;

export default Component.extend({
  tagName: 'li',
  classNames: ['o-list-inline__item'],

  colour: computed('assay', function() {
    return colours.getColour(get(this, 'assay'));
  })
});
