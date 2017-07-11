import Ember from 'ember';
import { createActionData } from 'repositive/utils/actions';
import { convertAttrActionToCommonObj } from 'repositive/utils/attributes';
import FlashMessageMixin from 'repositive/mixins/flash-message-mixin';

const { Mixin, get, Logger, set, getWithDefault } = Ember;

export default Mixin.create(FlashMessageMixin, {
  actions: {
    addAttribute(model, user, key, value) {
      const store = get(this, 'store');
      store
        .createRecord('action', createActionData(model, user, 'attribute', { properties: { key, value } }))
        .save()
        .then(savedAttribute => {
          const attributes = [...getWithDefault(this, 'attributes', []), ...[convertAttrActionToCommonObj(savedAttribute)]]
          set(this, 'attributes', attributes);
        })
        .catch(Logger.error);
    },

    addComment(model, user, text) {
      const store = get(this, 'store');
      return store
        .createRecord('action', createActionData(model, user, 'comment', { properties: { text } }))
        .save()
        .then(savedComment => {
          get(this, 'comments').insertAt(0, savedComment);
        })
        .catch(Logger.error);
    },

    addTag(model, user, text) {
      if (get(this, 'tags').findBy('properties.text', text)) {
        this._addFlashMessage(`The tag: ${text} already exists.`, 'warning' );
      } else {
        get(this, 'store')
          .createRecord('action', createActionData(model, user, 'tag', { properties: { text } }))
          .save()
          .then(savedTag => {
            get(this, 'tags').insertAt(0, savedTag);
          })
          .catch(Logger.error);
      }
    },

    deleteAction(action) {
      const actionType = get(action, 'type');

      if (actionType === 'attribute') { this._deleteAttribute(action); }

      action.destroyRecord()
        .then(() => { get(this, actionType + 's').removeObject(action) })
        .then(this._addFlashMessage(`${actionType.capitalize()} successfully deleted.`, 'success'))
        .catch(error => {
          this._addFlashMessage(`${actionType.capitalize()} could not be deleted. Please try again.`, 'warning');
          Logger.error(error);
        });
    }
  },

  _deleteAttribute(action) {
    set(this, 'attributes', get(this, 'attributes').rejectBy('actionId', action.id));
  }
});
