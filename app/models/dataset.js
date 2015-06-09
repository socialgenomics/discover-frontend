import DS from "ember-data";
import { poisson } from "repositive.io/utils/distributions";


export default DS.Model.extend({
  owner: DS.belongsTo('user', { async: true }),
  properties : DS.belongsTo('property'),
  repository: DS.belongsTo('repository'),
  favorites: DS.hasMany('favourite'),
  comments: DS.hasMany('comments'),
  tags: DS.hasMany('tag'),
  highlights: DS.belongsTo('highlight'),
  createdAt: DS.attr('isodate'),
  updatedAt: DS.attr('isodate'),
  count: DS.attr('number'),
  isRequest: DS.attr('boolean'),
  views: function(){
    return this.get('count') + poisson(0.5);
  }.property('count'),
});
