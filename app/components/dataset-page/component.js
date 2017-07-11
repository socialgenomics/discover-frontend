import Ember from 'ember';
import CheckEditPermissionsMixin from 'repositive/mixins/check-edit-permissions-mixin';
import EditModeMixin from 'repositive/mixins/edit-mode-mixin';
import { buildValidations } from 'ember-cp-validations';
import urlFormatValidator from 'repositive/validations/urlFormatValidator';
import presenceValidator from 'repositive/validations/presenceValidator';
import { createActionData } from 'repositive/utils/actions';
import { getSubscription } from 'repositive/utils/subscriptions';

const { Component, computed, inject: { service }, get, Logger, set } = Ember;
const Validations = buildValidations({
  title: presenceValidator(),
  description: presenceValidator(),
  url: urlFormatValidator()
});

export default Component.extend(
  EditModeMixin,
  Validations,
  CheckEditPermissionsMixin,
  {
    session: service(),
    urlGenerator: service(),
    store: service(),

    activeTab: 'metadata',
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
        const currentModel = get(this, 'model');
        const currentUser = get(this, 'userId');

        get(this, 'store')
          .createRecord('action', createActionData(currentModel, currentUser, 'access'))
          .save()
          .catch(Logger.error);

        get(this, 'metrics').trackEvent({
          category: 'discover_homeauth_datasetDetail',
          action: 'download_button',
          label: get(this, 'model.title')
        });
      },

      addComment(text) {
        get(this, 'addComment')(
          get(this, 'model'),
          get(this, 'userId'),
          text
        ).then(this._updateSubscription.bind(this))
      },

      addTag(text) {
        return get(this, 'addTag')(
          get(this, 'model'),
          get(this, 'userId'),
          text
        );
      },

      addAttribute(key, value) {
        return get(this, 'addAttribute')(
          get(this, 'model'),
          get(this, 'userId'),
          key,
          value
        );
      },

      deleteAction(action) {
        return get(this, 'deleteAction')(action);
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

    _updateSubscription() {
      const existingSubscription = get(this, 'subscription');

      if (existingSubscription) { return existingSubscription.reload(); }

      getSubscription(get(this, 'store'), get(this, 'model.id'), get(this, 'userId.id'))
        .then(subscription => set(this, 'subscription', subscription));
    }
  }
);
