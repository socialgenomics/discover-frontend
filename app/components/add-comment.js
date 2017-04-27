import Ember from 'ember';
import { buildValidations } from 'ember-cp-validations';
import emptyValidator from 'repositive/validations/emptyValidator';

const { Component, get, set, isEmpty, computed, inject: { service } } = Ember;

const Validations = buildValidations({
  comment: emptyValidator()
});

export default Component.extend(Validations, {
  session: service(),

  isActive: false,
  isValid: computed('validations.isValid', function() {
    return get(this, 'validations.isValid');
  }),
  classNames: 'u-flex u-items-start',
  classNameBindings: ['isActive:active'],
  allowComment: computed.and('isActive', 'session.isAuthenticated', 'isValid'),

  actions: {
    showButtons: function() {
      set(this, 'isActive', true);
    },
    cancel: function() {
      set(this, 'isActive', false);
      set(this, 'comment', null);
    },
    addComment() {
      //temporary validation
      if (!isEmpty(get(this, 'comment')) && get(this, 'allowComment')) {
        get(this, 'metrics').trackEvent({
          category: 'discover_homeauth_datasetDetail_comment',
          action: 'added comment',
          label: get(this, 'dataset.id')
        });
        get(this, 'addComment')(this.comment);
      }
      this.send('cancel');
    }
  }
});
