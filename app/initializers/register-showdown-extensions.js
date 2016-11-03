export function initialize() {
  showdown.extension('targetBlankLinks', function() {
    return [{
      type: 'html',
      regex: '<a',
      replace: '<a target="_blank" rel="noopener noreferrer"'
    }];
  });
}

export default {
  name: 'register-showdown-extensions',
  initialize
};
