import Ember from 'ember';
import DatasetActionsMixin from 'repositive/mixins/dataset-actions';

const { Controller, computed, inject: { service } } = Ember;

export default Controller.extend(DatasetActionsMixin, {
  session: service(),

  requestEditableProperties: [
    { key: 'title' },
    { key: 'description', multiline: true }
  ],

  request: computed.alias('model.request')
});
