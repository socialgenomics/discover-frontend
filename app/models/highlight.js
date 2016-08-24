import DS from 'ember-data';
import Ember from 'ember';
import { truncateAndRemoveNewlines } from '../utils/truncate';

export default DS.Model.extend({
  dataset: DS.belongsTo('dataset'),
  title: DS.attr('string'),
  description: DS.attr('string'),
  truncatedDescription: Ember.computed('description', function() {
    const charLimit = 100;
    let description = this.get('description');
    truncateAndRemoveNewlines(description, charLimit);
    return description;
  })
});
