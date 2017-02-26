import Ember from 'ember';
import CheckEditPermissionsMixin from 'repositive/mixins/check-edit-permissions-mixin';
import EditModeMixin from 'repositive/mixins/edit-mode-mixin';
import Validations from 'repositive/validations/dataset';

const { Controller, computed, inject: { service }, Logger, get, set, setProperties } = Ember;

export default Controller.extend(
  EditModeMixin,
  Validations,
  CheckEditPermissionsMixin,
  {
    session: service(),
    urlGenerator: service(),

    editablePropertyKeys: ['title', 'description', 'url'],


    dataset: computed.alias('model.dataset'),
    stats: computed.alias('model.stats'),
    comments: computed.filterBy('dataset.actionableId.actions', 'type', 'comment'),
    tags: computed.filterBy('dataset.actionableId.actions', 'type', 'tag'),

    checkEditPermissionsModel: computed.oneWay('dataset'),

    // copy of editable Properties
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

      cancelEditMode() {
        this.resetModuleStateOnCancel('dataset', get(this, 'editablePropertyKeys'));
      },

      save() {
        this.saveChanges(get(this, 'dataset'), get(this, 'editablePropertyKeys'));
      }
    }
  }
);
