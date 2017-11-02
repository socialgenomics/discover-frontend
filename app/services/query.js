import Ember from 'ember';

const { Service, get, set } = Ember;

export default Service.extend({
  queryString: null,

  getQueryString() {
    return get(this, 'queryString');
  },

  setQueryString(newString) {
    set(this, 'queryString', newString);
  }
});
