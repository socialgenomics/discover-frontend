import Ember from 'ember';
import { buildValidations } from 'ember-cp-validations';
import emptyValidator from 'repositive/validations/emptyValidator';

const { Component, get, set, isEmpty, computed, inject: { service } } = Ember;

const Validations = buildValidations({ comment: emptyValidator() });

export default Component.extend(Validations, {
  session: service(),
  errorMessages: service(),

  isActive: false,

  classNames: 'flex items-start',
  classNameBindings: ['isActive:active'],
  allowComment: computed.and('isActive', 'session.isAuthenticated', 'isValid'),

  isValid: computed('validations.isValid', function() {
    return get(this, 'validations.isValid');
  }),

  didReceiveAttrs() {
    this._super(...arguments);

    const context = 'dataset';
    const errorResp = {
      category: 'invalid-syntax',
      props: {
        tag: { 'min-length': '5' }
      }
    };
    const errorMessages = get(this, 'errorMessages');
    const errMsg = errorMessages.buildErrorMessage(context, errorResp);
    
    console.log(errMsg);
    debugger;
  },

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
