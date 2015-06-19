import Ember from 'ember';
import _ from 'npm:underscore';
import { titleCase } from 'repositive.io/utils/case';

export default Ember.Controller.extend({
  queryParams: ['q','ordering','assayType','tags','repository','accessType'],
  q: null,
  ordering: null,
  assayType: null,
  tags: null,
  accessType: null,
  isModalShown:false,

  filters: function(){
    let _this = this;
    let filters = this.get('queryParams');
    filters.removeAt(filters.indexOf('q'))
    console.log(filters)
    return _.map(filters, function(param){
      return {
        name: titleCase(param),
        value: _this.get(param),
      }
    });
  }.property('queryParams'),

  isFiltered: function(){
    let filters = this.get('filters');
    return filters.filterBy('value')
  }.property("filters.@each.value"),


  actions:{
    toggleModal(){
      this.toggleProperty('isModalShown');
    },
  }
});
