import Ember from 'ember';

const { Component, get, computed } = Ember;

export default Component.extend({
  tagName: 'li',
  classNames: ['u-p1', 'u-hv-bc-darken5'],

  isActive: computed('query', function() {
    return ('?help=' + get(this, 'query') === window.location.search);
  })
});
