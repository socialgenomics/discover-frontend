import Ember from 'ember';
import EmberValidations from 'ember-validations';
import FlashMessageMixin from 'repositive/mixins/flash-message-mixin';
import TrackEventsMixin from 'repositive/mixins/track-events-mixin';

const { Controller, computed, inject: { service }, get, getProperties, set, Logger } = Ember;
const validationErrorMessage = 'This field can\'t be blank.';

export default Controller.extend(
  EmberValidations,
  FlashMessageMixin,
  TrackEventsMixin,
  {
    session: service(),

    title: null,
    description: null,
    didRequest: false,
    loading: false,

    validations: {
      title: {
        presence: { message: validationErrorMessage }
      },
      description: {
        presence: { message: validationErrorMessage }
      }
    },

    isInvalid: computed.not('isValid'),

    actions: {
      addRequest: function() {
        if (get(this, 'isValid')) {
          this._createRequest().then(this._createRequestSuccess.bind(this))
          .catch(this._createRequestError.bind(this));
        }
      }
    },

    /**
     * @desc creates new dataset request and saves it in backend
     * @returns {Promise}
     * @private
     */
    _createRequest() {
      const { description, title } = getProperties(this, 'title', 'description');

      return this.store.createRecord('request', {
        userId: get(this, 'session.authenticatedUser'),
        title,
        description
      }).save();
    },

    /**
     * @desc create request promise resolve callback
     * @param {DS.Model} request
     * @private
     */
    _createRequestSuccess(request) {
      const id = get(request, 'id');

      set(this, 'didRequest', true);
      this._addFlashMessage('Request created successfully.', 'success');
      this.transitionToRoute('requests.detail', id);
      this._trackEvent('discover_homeauth_datasetRequest', 'requested', id);
    },

    /**
     * @desc create request promise reject callback
     * @param {Error} error
     * @private
     */
    _createRequestError(error) {
      set(this, 'loading', false);
      this._addFlashMessage('Oh dear. There was a problem submitting your dataset request.', 'warning');
      Logger.error(error);
    }
  });
