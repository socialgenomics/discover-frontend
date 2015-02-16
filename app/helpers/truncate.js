import Ember from 'ember';

export function truncate(str, options) {
  var len = options.hash.limit || 500;
  if (str.length > len) {
    return str.substring(0, len - 3) + '...';
  } else {
    return str;
  }
}

export default Ember.Handlebars.makeBoundHelper(truncate);
