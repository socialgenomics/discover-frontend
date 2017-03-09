import sanitizeHtml from 'npm:sanitize-html';

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
}

export default {
  name: 'register-showdown-extensions',
  initialize
};
