import Ember from 'ember';
import { createActionData } from 'repositive/utils/actions';
import { convertAttrActionToCommonObj } from 'repositive/utils/attributes';
import FlashMessageMixin from 'repositive/mixins/flash-message-mixin';

const { Mixin, get, Logger, set, getWithDefault } = Ember;

export default Mixin.create(FlashMessageMixin, {
  actions: {
    addAttribute(model, user, key, value) {
      const store = get(this, 'store');
      return store
        .createRecord('action', createActionData(model, user, 'attribute', { properties: { key, value } }))
        .save()
        .then(this._handleAttributeSaveSuccess.bind(this))
        .catch(this._handleError.bind(this, 'attribute', 'create'));
    },

    addComment(model, user, text) {
      const store = get(this, 'store');
      return store
        .createRecord('action', createActionData(model, user, 'comment', { properties: { text } }))
        .save()
        .then(this._handleCommentSaveSuccess.bind(this))
        .catch(this._handleError.bind(this, 'comment', 'create'));
    },

    addTag(model, user, text) {
      if (get(this, 'tags').findBy('properties.text', text)) {
        this._addFlashMessage(`The tag: ${text} already exists.`, 'warning' );
      } else {
        return get(this, 'store')
          .createRecord('action', createActionData(model, user, 'tag', { properties: { text } }))
          .save()
          .then(this._handleTagSaveSuccess.bind(this))
          .catch(this._handleError.bind(this, 'tag', 'create'));
      }
    },

    deleteAction(action) {
      const actionType = get(action, 'type');

      if (actionType === 'attribute') { this._deleteAttribute(action); }

      action.destroyRecord()
        .then(this._handleActionDeleteSuccess.bind(this, actionType))
        .catch(this._handleError.bind(this, actionType, 'delete'));
    }
  },

  _deleteAttribute(action) {
    set(this, 'attributes', get(this, 'attributes').rejectBy('actionId', action.id));
  },

  _handleAttributeSaveSuccess(savedAttribute) {
    const attributes = [
      ...getWithDefault(this, 'attributes', []),
      ...[convertAttrActionToCommonObj(savedAttribute)]
    ];
    set(this, 'attributes', attributes);
  },

  _handleCommentSaveSuccess(savedComment) {
    get(this, 'comments').insertAt(0, savedComment);
  },

  _handleTagSaveSuccess(savedTag) {
    get(this, 'tags').insertAt(0, savedTag);
  },

  _handleActionDeleteSuccess(actionType, deletedAction) {
    get(this, actionType + 's').removeObject(deletedAction)
    this._addFlashMessage(`${actionType.capitalize()} successfully deleted.`, 'success')
  },

  _handleError(actionType, methodType, error) {
    this._addFlashMessage(`${actionType.capitalize()} could not be ${methodType}d. Please try again.`, 'warning');
    Logger.error(error);
  }
});
