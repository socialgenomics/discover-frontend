import Ember from 'ember';

const { libraries } = Ember;

export function initialize() {
  const version = libraries._getLibraryByName('Repositive').version.split('+')[0];
  const previous = localStorage.getItem('version');

  if (version !== previous) {
    localStorage.clear();
    localStorage.setItem('version', version);
  }
}

export default {
  name: 'cleancache',
  initialize: initialize
};
