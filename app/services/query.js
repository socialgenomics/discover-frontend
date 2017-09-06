import Ember from 'ember';

const { Service, get, set } = Ember;

export default Service.extend({
  // queryString: '',
  queryTree: null,

  // getQueryString() {
  //   return get(this, 'queryString');
  // },
  //
  // setQueryString(newString) {
  //   set(this, 'queryString', newString);
  // },

  getQueryTree() {
    return get(this, 'queryTree');
  },

  setQueryTree(newTree) {
    set(this, 'queryTree', newTree);
  }
});
