import Ember from 'ember';

const { Service, get, set } = Ember;

export default Service.extend({
  queryTree: null,

  getQueryTree() {
    return get(this, 'queryTree');
  },

  setQueryTree(newTree) {
    set(this, 'queryTree', newTree);
  }
});
