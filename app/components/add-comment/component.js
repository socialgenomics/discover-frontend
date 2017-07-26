import Ember from 'ember';
import { buildValidations } from 'ember-cp-validations';
import emptyValidator from 'repositive/validations/emptyValidator';

const { Component, get, set, isEmpty, computed, inject: { service } } = Ember;

const Validations = buildValidations({ comment: emptyValidator() });

/**
 * @desc builds an error message using i18n
 * @param {string} context name of current context e.g. dataset
 * @param {Object} errorResp the error response
 * @return {string} User-friendly error message
 */
export function buildErrorMessage(context, errorResp, i18n) {
  if ('props' in errorResp) {
    const invalidObj = Object.keys(errorResp.props)[0];
    const invalidObjFirstKey = Object.keys(invalidObj)[0];
    debugger;
    const errorPath = `${context}.${errorResp.category}.${invalidObj}.${invalidObjFirstKey}`;
    return i18n.t(errorPath, errorResp.props);
  }
  return i18n.t(`${context}.${errorResp.category}.default`);
}

export default Component.extend(Validations, {
  session: service(),
  i18n: service(),

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
    const i18n = get(this, 'i18n');
    const errMsg = buildErrorMessage(context, errorResp, i18n);
    debugger;
    // const datasetErr = i18n.t(`${context}.${errorResp.category}`, errorResp.props);
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
