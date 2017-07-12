/* eslint-disable */
import sanitizeHtml from 'npm:sanitize-html';

function processEmTagInSearchResults(tagName, attribs) {
  if (attribs.class && attribs.class.indexOf('highlight') !== -1) {
    return { tagName, attribs: { class: 'fw-bold' } };
  }

  return { tagName, attribs };
}

export function initialize() {
  showdown.extension('targetBlankLinks', function() {
    return [{
      type: 'html',
      regex: '<a',
      replace: '<a target="_blank" rel="noopener noreferrer"'
    }];
  });

  showdown.extension('sanitize', function() {
    return [{
      type: 'lang',
      filter: text => sanitizeHtml(text)
    }];
  });

  showdown.extension('sanitizeSearchResults', function() {
    return [{
      type: 'lang',
      filter: text => sanitizeHtml(
        text,
        {
          transformTags: {
            em: processEmTagInSearchResults
          },
          allowedTags: ['em'],
          allowedAttributes: {
            em: ['class']
          }
        }
      )
    }];
  });
}

export default {
  name: 'register-showdown-extensions',
  initialize
};
