import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ['q','ordering'],
  q: null,
  ordering: null,
});
