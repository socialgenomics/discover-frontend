import Ember from 'ember';
import colours from 'repositive/utils/colours';

const { Component, computed, get } = Ember;

export default Component.extend({
  tagName: 'li',

  colour: computed('assay', function() {
    return colours.getColour(get(this, 'assay'));
  })
});
