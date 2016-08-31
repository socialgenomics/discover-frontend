
import Ember from 'ember';

export function initialize(application) {
  let version = Ember.libraries._getLibraryByName('Repositive').version.split('+')[0];
  let previous = localStorage.getItem('version');

  if (version !== previous) {
    localStorage.clear();
    localStorage.setItem('version', version);
  }
}

export default {
  name: 'cleancache',
  initialize: initialize
};
