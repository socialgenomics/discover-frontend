import Ember from 'ember';

const { Component, computed, get } = Ember;

function toHTML(samples) {
  // Order the keys so the Ids always show up at the beguinning, order the rest alphabetically.
  const keys = Object.keys(samples && samples[0] || {}).sort((a, b) => {
    if (a === 'Sample ID') {
      return -1;
    } else if (b === 'Sample ID') {
      return 1;
    } else {
      return a.split('_').join('').toLowerCase().localeCompare(b.split('_').join('').toLowerCase())
    }
  });

  function getRows() {
    return samples.map((obj) => {
      const row = keys.reduce(
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
    const headers = keys.map((k) => {
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
