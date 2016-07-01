import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo } from 'ember-data/relationships';

export default Model.extend({
  avatar: attr('string'),
  education_degree: attr('string'),
  education_universiry: attr('string'),
  work_role: attr('string'),
  work_organisation: attr('string'),
  interests: attr('string'),
  user_id: attr('string'),
  user: belongsTo('user')
});
