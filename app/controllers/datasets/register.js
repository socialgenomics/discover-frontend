import Ember from 'ember';
import EmberValidations from 'ember-validations';
import FlashMessageMixin from 'repositive/mixins/flash-message-mixin';
import TrackEventsMixin from 'repositive/mixins/track-events-mixin';

const { Controller, computed, get, getProperties, set, inject: { service }, Logger } = Ember;

export default Controller.extend(
  EmberValidations,
  FlashMessageMixin,
  TrackEventsMixin,
  {
    session: service(),

    title: null,
    description: null,
    url: null,
    didRegister: false,
    loading: false,

    validations: {
      title: {
        presence: { message: 'This field can\'t be blank.' }
      },
      description: {
        presence: { message: 'This field can\'t be blank.' }
      },
      url: {
        format: {
          with: /[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/,
          allowBlank: true,
          message: 'must be a valid url'
        }
      }
    },

    isInvalid: computed.not('isValid'),

    actions: {
      addDataset: function () {
        if (this.get('isValid')) {
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
      this.addFlashMessage('Dataset successfully registered', 'success');
      this.trackEvent('dataset', 'register', id);
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
      this.addFlashMessage('Oh dear. There was a problem registering your dataset.', 'warning');
    }
  }
);
