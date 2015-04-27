import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ['q', 'repo'],
  q: null,
  repo: null,
});
