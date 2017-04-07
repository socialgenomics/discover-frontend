import Ember from 'ember';
import CheckEditPermissionsMixin from 'repositive/mixins/check-edit-permissions-mixin';
import EditModeMixin from 'repositive/mixins/edit-mode-mixin';
import SubscribableMixin from 'repositive/mixins/subscribable';

// TODO figure out how to lazy inject mixins or find other solution.
// Right now it will work cause dataset validation has URL as optional and request doesn't have URL at all
import { buildValidations } from 'ember-cp-validations';
import urlFormatValidator from 'repositive/validations/urlFormatValidator';
import presenceValidator from 'repositive/validations/presenceValidator';

const { Component, computed, inject: { service }, get, Logger, set, merge } = Ember;
const Validations = buildValidations({
  title: presenceValidator(),
  description: presenceValidator(),
  url: urlFormatValidator()
});

export default Component.extend(
  EditModeMixin,
  Validations,
  CheckEditPermissionsMixin,
  SubscribableMixin,
  {
    session: service(),
    urlGenerator: service(),
    store: service(),

    activeTab: 'attributes',
    classNames: ['c-card c-card-detail'],
    classNameBindings: ['session.isAuthenticated:dataset-notification-margin'],

    editablePropertyKeys: computed.mapBy('editableProperties', 'key'),
    checkEditPermissionsModel: computed.oneWay('model'),
    userId: computed.alias('session.authenticatedUser'),
    isRequest: computed.equal('modelName', 'request'),

    modelName: computed('model', function () {
      return get(this, 'model').constructor.modelName;
    }),

    modelUrl: computed('model.id', function () {
      return get(this, 'urlGenerator').generateUrl(`${get(this, 'modelName')}s.detail`, get(this, 'model.id'));
    }),

    init() {
      this._super(...arguments);

      // Create copies of editable model properties for edit mode
      get(this, 'editablePropertyKeys').forEach(key => set(this, key, get(this, `model.${key}`)));
    },

    actions: {
      trackExit() {
        get(this, 'store')
          .createRecord('action', this._createNewRecordData('access'))
          .save()
          .catch(Logger.error);

        get(this, 'metrics').trackEvent({
          category: 'discover_homeauth_datasetDetail',
          action: 'download_button',
          label: get(this, 'model.title')
        });

        window.open(get(this, 'model.url'), '_blank').focus();
      },

      addAttribute(key, value) {
        const store = get(this, 'store');
        store
          .createRecord('action', this._createNewRecordData('attribute', { properties: { key, value } }))
          .save()
          .then(() => { this._reloadSubscriptions(store); })
          .catch(Logger.error);
      },

      addComment(text) {
        const store = get(this, 'store');
        store
          .createRecord('action', this._createNewRecordData('comment', { properties: { text } }))
          .save()
          .then(() => { this._reloadSubscriptions(store); })
          .catch(Logger.error);
      },

      addTag(text) {
        if (get(this, 'tags').findBy('properties.text', text)) {
          this.flashMessages.add({ message: `The tag: ${text} already exists.`, type: 'warning' });
        } else {
          get(this, 'store')
            .createRecord('action', this._createNewRecordData('tag', { properties: { text } }))
            .save()
            .catch(Logger.error);
        }
      },

      cancelEditMode() {
        this.resetModuleStateOnCancel('model', get(this, 'editablePropertyKeys'));
      },

      save() {
        if (get(this, 'validations.isValid')) {
          this.saveChanges(get(this, 'model'), get(this, 'editablePropertyKeys'));
        }
      },

      setActiveTab(tab) { set(this, 'activeTab', tab); }
    },

    /**
     * @desc created object with new record data
     * @param {String} type
     * @param {Object?} customProps
     * @returns {Object}
     * @private
     */
    _createNewRecordData(type, customProps = {}) {
      const commonProps = {
        actionableId: get(this, 'model.actionableId'),
        actionable_model: get(this, 'modelName'),
        userId: get(this, 'userId'),
        type
      };

      return merge(commonProps, customProps);
    },

    /**
     * @desc re-fetch subscriptions to update the follow-button
     * @param {Object} store
     * @private
     */
    _reloadSubscriptions(store) {
      const existingSubscription = store.peekAll('subscription').filter(subscription => {
        const userIdMatches = get(subscription, 'userId.id') === get(this, 'userId.id');
        const subscribableIdMatches = get(subscription, 'subscribableId.id') === get(this, 'model.id');
        return userIdMatches && subscribableIdMatches;
      });
      if (existingSubscription.length === 0) {
        this._getSubscriptions(store, get(this, 'model.id'), get(this, 'userId.id'));
      }
    }
  }
);
