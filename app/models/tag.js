import DS from 'ember-data';

var Tag = DS.Model.extend({
  name: DS.attr('string'),
  datasets: DS.hasMany('dataset'),
});

Tag.reopenClass({
  FIXTURES:[
    {
      id:1,
      name:'lala',
      datasets:[1]
    }  
  ]
});

export default Tag;
