import Ember from 'ember';

const { Service, get, set } = Ember;

export default Service.extend({
  queryArray: null,

  getQueryArray() {
    return get(this, 'queryArray');
  },

  setQueryArray(newArray) {
    set(this, 'queryArray', newArray);
  }
});
