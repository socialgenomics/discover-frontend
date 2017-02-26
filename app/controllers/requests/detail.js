import Ember from 'ember';
import CheckEditPermissionsMixin from 'repositive/mixins/check-edit-permissions-mixin';
import FlashMessageMixin from 'repositive/mixins/flash-message-mixin';
import { validator, buildValidations } from 'ember-cp-validations';

const { Controller, computed, inject: { service }, Logger, get, set, setProperties } = Ember;
const validationErrorMessage = 'This field can\'t be blank.';
const Validations = buildValidations({
  title: validator('presence', {
    presence: true,
    message: validationErrorMessage
  }),
  description: validator('presence', {
    presence: true,
    message: validationErrorMessage
  })
});

export default Controller.extend(
  FlashMessageMixin,
  Validations,
  CheckEditPermissionsMixin,
  {
    session: service(),
    urlGenerator: service(),

    inEditMode: false,

    request: computed.alias('model.request'),
    comments: computed.filterBy('request.actionableId.actions', 'type', 'comment'),
    tags: computed.filterBy('request.actionableId.actions', 'type', 'tag'),

    checkEditPermissionsModel: computed.oneWay('request'),
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

      enterEditMode() {
        set(this, 'inEditMode', true);
      },

      cancelEditMode() {
        setProperties(this, {
          inEditMode: false,
          title: get(this, 'request.title'),
          description: get(this, 'request.description')
        });
      },

      save() {
        const request = get(this, 'request');

        setProperties(request, {
          'title': get(this, 'title'),
          'description': get(this, 'description')
        });
        request
          .save()
          .then(this._onEditSuccess.bind(this))
          .catch(this._onEditError.bind(this));
      }
    },

    _onEditSuccess() {
      set(this, 'inEditMode', false);
      this._addFlashMessage('Your request has benn updated.', 'success');
    },

    _onEditError() {
      get(this, 'request').rollbackAttributes();
      set(this, 'inEditMode', false);
      this._addFlashMessage('There was problem with updating you request.', 'warning');
    }
  }
);
