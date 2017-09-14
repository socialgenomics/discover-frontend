import Ember from 'ember';

const { Component, computed, get } = Ember;

export default Component.extend({
  classNames: ['c-sample-table'],
  cleanTable: computed('table', function() {
    const table = get(this, 'table');
    const tableStart = table.indexOf('<table');
    return table.substring(tableStart);
  })
});
