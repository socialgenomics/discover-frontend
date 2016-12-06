import Ember from 'ember';

const { Mixin } = Ember;

export default Mixin.create({
  queryParams: ['query'],
  query: null
});
