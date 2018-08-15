import Ember from 'ember';
import FlashMessageMixin from 'repositive/mixins/flash-message-mixin';
import TrackEventsMixin from 'repositive/mixins/track-events-mixin';

const { Mixin, inject: { service }, get, set, setProperties, Logger } = Ember;

export default Mixin.create(FlashMessageMixin, TrackEventsMixin, {
  session: service(),

  title: null, //only used for keeping state of form if not submitted
  description: null, //only used for keeping state of form if not submitted
  isNHLBI: false,

  isLoading: false,

  actions: {
    submitRequest(requestObject) {
      set(this, 'isLoading', true);
      return this._createRequest(requestObject)
        .then(this._createRequestSuccess.bind(this))
        .catch(this._createRequestError.bind(this))
        .finally(() => set(this, 'isLoading', false));
    },
    saveForLater(requestObject) {
      setProperties(this, requestObject);
    }
  },

  /**
   * @desc creates new dataset request and saves it in backend
   * @param requestObject the data representation of the new request
   * @returns {Promise}
   * @private
   */
  _createRequest(requestObject) {
    const { title, description, isNHLBI} = requestObject;

    return this.store.createRecord('request', {
      userId: get(this, 'session.authenticatedUser'),
      title,
      description,
      isNHLBI
    }).save();
  },

  /**
   * @desc create request promise resolve callback
   * @param {DS.Model} request
   * @private
   */
  _createRequestSuccess(request) {
    const id = get(request, 'id');

    this._addFlashMessage('Request created successfully.', 'success');
    this._trackEvent('discover_homeauth_datasetRequest', 'requested', id);
    this.transitionToRoute('requests.detail', id);
    setProperties(this, { title: null, description: null });
  },

  /**
   * @desc create request promise reject callback
   * @param {Error} error
   * @private
   */
  _createRequestError(error) {
    this._addFlashMessage('Oh dear. There was a problem submitting your dataset request.', 'warning');
    Logger.error(error);
  }
});
