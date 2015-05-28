import DS from "ember-data";
import { poisson } from "repositive.io/utils/distributions";


export default DS.Model.extend({
  properties : DS.belongsTo('property'),
  repository: DS.belongsTo('repository'),
  tags: DS.hasMany('tag'),
  comments: DS.hasMany('comments'),
  createdAt: DS.attr('isodate'),
  updatedAt: DS.attr('isodate'),
  views: function(){
    return poisson(0.5);
  }.property('id')
});
