import Ember from 'ember';
import FlashMessageMixin from 'repositive/mixins/flash-message-mixin';
import TrackEventsMixin from 'repositive/mixins/track-events-mixin';
import { validator, buildValidations } from 'ember-cp-validations';

const { Controller, computed, get, getProperties, set, inject: { service }, Logger } = Ember;
const Validations = buildValidations({
  title: validator('presence', {
    presence: true,
    message: 'This field can\'t be blank.'
  }),
  description: validator('presence', {
    presence: true,
    message: 'This field can\'t be blank.'
  }),
  url: validator('format', {
    regex: /[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/,
    allowBlank: true,
    message: 'Must be a valid url.'
  })
});


export default Controller.extend(
  Validations,
  FlashMessageMixin,
  TrackEventsMixin,
  {
    session: service(),

    title: null,
    description: null,
    url: null,
    didRegister: false,
    loading: false,

    isInvalid: computed.not('validations.isValid'),

    actions: {
      addDataset: function () {
        if (this.get('validations.isValid')) {
          const userModel = this.get('session.authenticatedUser');

          set(this, 'loading', true);

          this.store.findRecord('collection', get(userModel, 'id'))
            .then(this._createDataset.bind(this, userModel))
            .then(this._createDatasetSuccess.bind(this))
            .catch(this._createDatasetError.bind(this));
        }
      }
    },

    /**
     * @desc creates new dataset model and saves it to backend
     * @param {DS.Model} userModel
     * @param {DS.Model} dataSource
     * @returns {Promise}
     * @private
     */
    _createDataset(userModel, dataSource) {
      const { title, description, url } = getProperties(this, 'title', 'description', 'url');

      return this.store.createRecord('dataset', {
        title,
        description,
        url,
        datasourceId: dataSource,
        externalId: get(userModel, 'id') + Date.now(),
        userId: userModel
      }).save();
    },

    /**
     * @desc create dataset promise resolve callback
     * @param {DS.Model} dataset
     * @private
     */
    _createDatasetSuccess(dataset) {
      const id = get(dataset, 'id');

      set(this, 'didRegister', true);
      this._addFlashMessage('Dataset successfully registered', 'success');
      this._trackEvent('discover_homeauth_datasetRegister', 'registered', id);
      this.transitionToRoute('datasets.detail', id);
    },

    /**
     * @desc create dataset promise reject callback
     * @param {Error} error
     * @private
     */
    _createDatasetError(error) {
      Logger.error(error);
      set(this, 'loading', false);
      this._addFlashMessage('Oh dear. There was a problem registering your dataset.', 'warning');
    }
  }
);
