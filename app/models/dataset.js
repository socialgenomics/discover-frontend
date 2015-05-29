import DS from "ember-data";
import { poisson } from "repositive.io/utils/distributions";


export default DS.Model.extend({
  owner: DS.belongsTo('user'),
  properties : DS.belongsTo('property'),
  repository: DS.belongsTo('repository'),
  tags: DS.hasMany('tag'),
  comments: DS.hasMany('comments'),
  createdAt: DS.attr('isodate'),
  updatedAt: DS.attr('isodate'),
  count: DS.attr('number'),
  views: function(){
    return this.get('count') + poisson(0.5);
  }.property('count')
});
