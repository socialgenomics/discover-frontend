import Ember from 'ember';

const { Component, computed, get } = Ember;

function toHTML(samples) {
  function getRows() {
    return samples.map((obj) => {
      const row = Object.keys(obj).reduce(
        (acc, key) => {
          let link = '';
          let endLink = '';
          if (obj.url) {
            link = '<a href=\'' + obj.url + '\' target=\'_blank\' >';
            endLink = '</a>';
          }
          return acc + `<td>${link}${obj[key]}${endLink}</td>`;
        },
        ''
      );
      return '<tr>' + row + '</tr>';
    }).reduce((acc, currentValue) => acc + currentValue, '');
  }

  function getHeaders() {
    const headers = Object.keys(samples[0] || {}).map((k) => {
      return k.split('_').map(w => {
        const gr = w.split('')
        return gr.shift().toUpperCase() + gr.join('');
      })
        .join(' ');
    })
      .map(header => `<th>${header}</th>`)
      .join('');

    return `<tr>${headers}</tr>`
  }

  return `
    <table>
      ${getHeaders()}
      ${getRows()}
    </table>
  `;
}

export default Component.extend({
  classNames: ['c-sample-table'],
  cleanTable: computed('table', function() {
    return toHTML(get(this, 'samples'));
  })
});
