import Ember from 'ember';

const { Component, computed, get } = Ember;

function toHTML(samples) {
  function getRows() {
    return samples.map((obj) => {
      const row = Object.keys(obj).reduce(
        (acc, key) => {
          if (obj.url && (key === 'Sample ID')) {
            const link = `<a href=${obj.url} target='_blank'>`;
            return acc + `<td>${link}${obj[key]}</a></td>`;
          } else if (key === 'url') {
            return acc;
          } else {
            return acc + `<td>${obj[key]}</td>`;
          }
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
      .filter(header => header !== 'Url')
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
  table: computed('samples', function() {
    return toHTML(get(this, 'samples'));
  })
});
