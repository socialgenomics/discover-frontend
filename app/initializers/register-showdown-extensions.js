export function initialize() {
  showdown.extension('targetBlankLinks', function() {
    return [{
      type: 'html',
      regex: '<a',
      replace: '<a target="_blank" rel="noopener noreferrer"'
    }];
  });

  showdown.extension('truncateClass', function() {
    return [{
      type: 'html',
      regex: '<p>',
      replace: '<p class="markdown-text truncate two-lines">'
    }];
  });
}

export default {
  name: 'register-showdown-extensions',
  initialize
};
