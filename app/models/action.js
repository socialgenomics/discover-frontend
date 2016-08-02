import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo } from 'ember-data/relationships';

export default Model.extend({
  // actionableId: attr('string'), //Id of model on which the action was made
  // actionable: belongsTo('actionable'), //e.g. dataset model
  properties: attr('object'),
  type: attr('string'),
  userId: belongsTo('user'),
  actionableId: belongsTo('actionable')
  // actionable: belongsTo('dataset')

});
