import Ember from 'ember';
import FlashMessageMixin from 'repositive/mixins/flash-message-mixin';
import TrackEventsMixin from 'repositive/mixins/track-events-mixin';

const { Mixin, inject: { service }, get, set, setProperties, Logger } = Ember;

export default Mixin.create(FlashMessageMixin, TrackEventsMixin, {
  session: service(),

  title: null, //only used for keeping state of form if not submitted
  description: null, //only used for keeping state of form if not submitted

  loading: false,

  actions: {
    submitRequest(requestObject) {
      return this._createRequest(requestObject)
        .then(this._createRequestSuccess.bind(this))
        .catch(this._createRequestError.bind(this));
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
    const { title, description } = requestObject;

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

    setProperties(this, { title: null, description: null });
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
