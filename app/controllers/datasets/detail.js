import Ember from 'ember';
import CheckEditPermissionsMixin from 'repositive/mixins/check-edit-permissions-mixin';
import FlashMessageMixin from 'repositive/mixins/flash-message-mixin';
import { validator, buildValidations } from 'ember-cp-validations';

const { Controller, computed, inject: { service }, Logger, get, set, setProperties } = Ember;
const Validations = buildValidations({
  title: validator('presence', {
    presence: true,
    message: 'This field can\'t be blank.'
  }),
  description: validator('presence', {
    presence: true,
    message: 'This field can\'t be blank.'
  }),
  url: validator('format', {
    regex: /[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/,
    allowBlank: true,
    message: 'Must be a valid url.'
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

    dataset: computed.alias('model.dataset'),
    stats: computed.alias('model.stats'),
    comments: computed.filterBy('dataset.actionableId.actions', 'type', 'comment'),
    tags: computed.filterBy('dataset.actionableId.actions', 'type', 'tag'),

    checkEditPermissionsModel: computed.oneWay('dataset'),
    title: computed.oneWay('dataset.title'),
    description: computed.oneWay('dataset.description'),
    url: computed.oneWay('dataset.url'),

    commentsSorted : computed.sort('comments', (itemA, itemB) => {
      if (itemA.get('createdAt') < itemB.get('createdAt')) {
        return 1;
      } else if (itemA.get('createdAt') > itemB.get('createdAt')) {
        return -1;
      }
      return 0;
    }),

    datasetsNumber: computed('stats.datasets', function() {
      return get(this, 'stats.datasets').toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }),

    datasetUrl: computed('type', 'dataset.id', function () {
      return get(this, 'urlGenerator').generateUrl('datasets.detail', get(this, 'dataset.id'));
    }),

    actions: {
      trackExit() {
        const userId = get(this, 'session.authenticatedUser');
        const dataset = get(this, 'dataset');
        this.store.createRecord('action', {
          actionableId: get(dataset, 'actionableId'),
          actionable_model: dataset.constructor.modelName,
          userId: userId,
          type: 'access'
        }).save().catch(Logger.error);

        get(this, 'metrics').trackEvent({
          category: 'discover_homeauth_datasetDetail',
          action: 'download_button',
          label: get(this, 'dataset.title')
        });
        window.open(get(this, 'dataset.url'), '_blank').focus();
      },

      trackLinkEvent() {
        get(this, 'metrics').trackEvent({
          category: 'discover_openpage_datasetBanner_searchNow',
          action: 'link_clicked'
        });
      },

      addComment(text) {
        const userId = get(this, 'session.authenticatedUser');
        const dataset = get(this, 'dataset');
        this.store.createRecord('action', {
          actionableId: get(dataset, 'actionableId'),
          actionable_model: dataset.constructor.modelName,
          userId: userId,
          type: 'comment',
          properties: {
            text: text
          }
        }).save().catch(Logger.error);
      },

      addTag(text) {
        const userId = get(this, 'session.authenticatedUser');
        const dataset = get(this, 'dataset');
        const existingTags = get(this, 'tags');
        // if the tag already exists
        if (existingTags.findBy('properties.text', text)) {
          this.flashMessages.add({
            message: 'The tag: ' + text + ' already exists.',
            type: 'warning'
          });
        } else {
          const tag = this.store.createRecord('action', {
            actionableId: get(dataset, 'actionableId'),
            actionable_model: dataset.constructor.modelName,
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
          title: get(this, 'dataset.title'),
          description: get(this, 'dataset.description'),
          url: get(this, 'dataset.url')
        });
      },

      save() {
        const dataset = get(this, 'dataset');

        setProperties(dataset, {
          title: get(this, 'title'),
          description: get(this, 'description'),
          url: get(this, 'url')
        });
        dataset
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
