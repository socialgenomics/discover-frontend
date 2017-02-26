import Ember from 'ember';
import CheckEditPermissionsMixin from 'repositive/mixins/check-edit-permissions-mixin';
import EditModeMixin from 'repositive/mixins/edit-mode-mixin';
import Validations from 'repositive/validations/request';

const { Controller, computed, inject: { service }, Logger, get, set, setProperties } = Ember;

export default Controller.extend(
  EditModeMixin,
  Validations,
  CheckEditPermissionsMixin,
  {
    session: service(),
    urlGenerator: service(),

    editablePropertyKeys: ['title', 'description'],

    request: computed.alias('model.request'),
    comments: computed.filterBy('request.actionableId.actions', 'type', 'comment'),
    tags: computed.filterBy('request.actionableId.actions', 'type', 'tag'),

    checkEditPermissionsModel: computed.oneWay('request'),

    // copy of editable Properties
    title: computed.oneWay('request.title'),
    description: computed.oneWay('request.description'),

    commentsSorted: computed.sort('comments', (itemA, itemB) => {
      if (itemA.get('createdAt') < itemB.get('createdAt')) {
        return 1;
      } else if (itemA.get('createdAt') > itemB.get('createdAt')) {
        return -1;
      }
      return 0;
    }),

    requestUrl: computed('request.id', function () {
      return get(this, 'urlGenerator').generateUrl('requests.detail', get(this, 'request.id'));
    }),

    actions: {
      addComment(text) {
        const userId = this.get('session.authenticatedUser');
        const request = this.get('request');
        let comment = this.store.createRecord('action', {
          actionableId: request.get('actionableId'),
          actionable_model: request.constructor.modelName,
          userId: userId,
          type: 'comment',
          properties: {
            text: text
          }
        });
        comment.save().catch(Logger.error);
      },

      addTag(text) {
        const userId = this.get('session.authenticatedUser');
        const request = this.get('request');
        const existingTags = this.get('tags');
        // if the tag already exists
        if (existingTags.findBy('properties.text', text)) {
          this.flashMessages.add({
            message: 'The tag: ' + text + ' already exists.',
            type: 'warning'
          });
        } else {
          const tag = this.store.createRecord('action', {
            actionableId: request.get('actionableId'),
            actionable_model: request.constructor.modelName,
            userId: userId,
            type: 'tag',
            properties: {
              text: text
            }
          });
          tag.save().catch(Logger.error);
        }
      },

      toggleTagModal() {
        this.toggleProperty('isShowingTagModal');
      },

      cancelEditMode() {
        this.resetModuleStateOnCancel('request', get(this, 'editablePropertyKeys'));
      },

      save() {
        this.saveChanges(get(this, 'request'), get(this, 'editablePropertyKeys'));
      }
    }
  }
);
