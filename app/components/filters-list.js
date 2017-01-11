import Ember from 'ember';

const { Component, get, set } = Ember;

export default Component.extend({
  tagName: 'nav',
  classNames: ['side-nav filters-list'],
  classNameBindings: ['light-font-color'],
  didReceiveAttrs() {
    this._super(...arguments);
    if (get(this, 'modelType') === 'datasource') {
      set(this, 'filters', get(this, 'filters').rejectBy('name', 'datasource'));
    }
  }
});
