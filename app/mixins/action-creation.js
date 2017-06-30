import Ember from 'ember';
import { createActionData } from 'repositive/utils/actions';

const { Mixin, get, Logger } = Ember;

export default Mixin.create({
  actions: {
    addAttribute(key, value) {
      const currentModel = get(this, 'model');
      const currentUser = get(this, 'userId');
      const store = get(this, 'store');
      store
        .createRecord('action', createActionData(currentModel, currentUser, 'attribute', { properties: { key, value } }))
        .save()
        .then(() => this._reloadSubscriptions(store))
        .catch(Logger.error);
    },

    addComment(text) {
      const currentModel = get(this, 'model');
      const currentUser = get(this, 'userId');
      const store = get(this, 'store');
      store
        .createRecord('action', createActionData(currentModel, currentUser, 'comment', { properties: { text } }))
        .save()
        .then(savedComment => {
          get(this, 'commentsSorted').insertAt(0, savedComment);
          this._reloadSubscriptions(store);
        })
        .catch(Logger.error);
    },

    addTag(text) {
      if (get(this, 'tags').findBy('properties.text', text)) {
        this.flashMessages.add({ message: `The tag: ${text} already exists.`, type: 'warning' });
      } else {
        const currentModel = get(this, 'model');
        const currentUser = get(this, 'userId');
        get(this, 'store')
          .createRecord('action', createActionData(currentModel, currentUser, 'tag', { properties: { text } }))
          .save()
          .catch(Logger.error);
      }
    }
  }
});
