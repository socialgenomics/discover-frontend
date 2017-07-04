import Ember from 'ember';
import ActionCreationMixin from 'repositive/mixins/action-creation';

const { Controller, computed, inject: { service } } = Ember;

export default Controller.extend(ActionCreationMixin, {
  session: service(),

  requestEditableProperties: [
    { key: 'title' },
    { key: 'description', multiline: true }
  ],

  request: computed.alias('model.request')
});
