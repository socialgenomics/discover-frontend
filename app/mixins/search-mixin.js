import Ember from 'ember';
import ENV from 'repositive.io/config/environment';

export default Ember.Mixin.create({
  needs: ['application'],
  query: '',
  actions: {
    search: function() {
      // query api.repositive.io/metadata/search with this.query
    },
  }
});
