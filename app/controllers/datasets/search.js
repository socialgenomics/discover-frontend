import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ['q','ordering','assayType','tags',],
  q: null,
  ordering: null,
  assayType: null,
  tags: null,
  filters: function(){
    return [
      {
        name: 'Assay Type',
        value: this.assayType,
      },
    ]
  }.property('assayType'),
});
