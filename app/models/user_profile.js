import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo } from 'ember-data/relationships';

export default Model.extend({
  avatar: attr('string'),
  educationDegree: attr('string'),
  educationUniversiry: attr('string'),
  workRole: attr('string'),
  workOrganisation: attr('string'),
  interests: attr('string'),
  userId: belongsTo('user')

});
