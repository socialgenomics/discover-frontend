import Ember from 'ember';
import FlashMessageMixin from './flash-message-mixin';

const { get, Mixin, set, setProperties } = Ember;


export default Mixin.create(
  FlashMessageMixin,
  {
    inEditMode: false,

    actions: {
      enterEditMode() {
        set(this, 'inEditMode', true);
      }
    },

    /**
     * @desc resets all changes to copies ofr model properties which can be edited
     * @param {String} modelName
     * @param {Array} keys
     */
    resetModuleStateOnCancel(modelName, keys) {
      const data = Object.assign({ inEditMode: false }, this._createDataModel(keys, modelName ));

      setProperties(this, data);
    },

    /**
     * @desc changes model state in store and persists it to backend
     * @param {DS.Model} model
     * @param {Array} keys
     */
    saveChanges(model, keys) {
      setProperties(model, this._createDataModel(keys));
      this.persistChanges(model);
    },

    /**
     * @desc persist changes to backend
     * @param {DS.Model} model
     * @todo: extracted from saveChanges just for comment model as it has different data model
     *        and general _createDataModel doesn't work. Would be nice to change comments data
     *        model so it's fat as other DS models we use for editing
     */
    persistChanges(model) {
      model
        .save()
        .then(this._onEditSuccess.bind(this))
        .catch(this._onEditError.bind(this, model));
    },

    /**
     * @desc helper method for creating object which can be passed to setProperties method
     * @param {Array} keys
     * @param {String?} modelName
     * @returns {Object}
     * @private
     */
    _createDataModel(keys, modelName) {
      const keyPrefix = modelName ? `${modelName}.` : '';

      return keys.reduce((obj, key) => {
        obj[key] = get(this, keyPrefix + key);
        return obj;
      }, {});
    },

    _onEditSuccess() {
      set(this, 'inEditMode', false);
      this._addFlashMessage('Your request has been updated.', 'success');
    },

    _onEditError(model) {
      model.rollbackAttributes();
      set(this, 'inEditMode', false);
      this._addFlashMessage('There was problem with updating you request.', 'warning');
    }
  }
);
