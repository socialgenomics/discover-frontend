import DS from 'ember-data';
import Ember from 'ember';
import { truncateAndRemoveNewlines } from '../utils/truncate';

export default DS.Model.extend({
  userId: DS.belongsTo('user'),
  title: DS.attr('string'),
  description: DS.attr('string'),
  truncatedDescription: Ember.computed('description', function() {
    const charLimit = 100;
    let description = this.get('description');
    truncateAndRemoveNewlines(description, charLimit);
    return description;
  }),
  actionableId: DS.belongsTo('actionable', { inverse: 'request' }),
  stats: DS.attr('object'),
  createdAt: DS.attr('isodate'),
  updatedAt: DS.attr('isodate')
});
