import Ember from 'ember';

const { Component, computed, get } = Ember;

function toHTML(samples) {
  const rows = samples.map((obj, index) => {
    const spacer = index > 0 ? 'td' : 'th';
    const row = Object.keys(obj).reduce(
      (acc, key) => {
        let link = '';
        let endLink = '';
        if (obj.url) {
          link = '<a href=\'' + obj.url + '\' target=\'_blank\' >';
          endLink = '</a>';
        }
        return acc + '<' + spacer + '>' + link + obj[key] + endLink + '</' + spacer + '>';
      },
      ''
    );
    return '<tr>' + row + '</tr>';
  }).reduce((acc, currentValue) => acc + currentValue, '');

  return `<table>${rows}</table>`;
}

export default Component.extend({
  classNames: ['c-sample-table'],
  cleanTable: computed('table', function() {
    const samples = get(this, 'samples');
    const table = toHTML(samples);
    const tableStart = table.indexOf('<table');
    return table.substring(tableStart);
  })
});
