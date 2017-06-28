// TODO: change into real social account linking component with OAuth validation
// This code is temporary copy pase logic from profile details component

import Ember from 'ember';
import { buildValidations } from 'ember-cp-validations';
import { errorMessages, patterns } from 'repositive/validations/validations-config';
import { validator } from 'ember-cp-validations';
import FlashMessageMixin from 'repositive/mixins/flash-message-mixin';
import UserProfileMixin, { createIsDirtyComputed, createUserAttrKey } from 'repositive/mixins/user-edit-profile-mixin';

const { Component, inject: { service }, set, get, isEmpty } = Ember;
const Validations = buildValidations({
  [createUserAttrKey('profile.accounts.googlePlus')]: validator('format', {
    regex: patterns.google,
    allowBlank: true,
    message: errorMessages.invalidGoogleLink
  }),
  [createUserAttrKey('profile.accounts.linkedIn')]: validator('format', {
    regex: patterns.linkedin,
    allowBlank: true,
    message: errorMessages.invalidLinkedinLink
  }),
  [createUserAttrKey('profile.accounts.twitter')]: validator('format', {
    regex: patterns.twitter,
    allowBlank: true,
    message: errorMessages.invalidTwitterHandle
  }),
  [createUserAttrKey('profile.accounts.researchGate')]: validator('format', {
    regex: patterns.researchgate,
    allowBlank: true,
    message: errorMessages.invalidResearchGateLink
  }),
  [createUserAttrKey('profile.accounts.orcid')]: validator('format', {
    regex: patterns.orcid,
    allowBlank: true,
    message: errorMessages.invalidOrcidLink
  })
});

const editableAttrs = ['profile.accounts.googlePlus', 'profile.accounts.linkedIn', 'profile.accounts.twitter',
  'profile.accounts.researchGate', 'profile.accounts.orcid'];

export default Component.extend(Validations, FlashMessageMixin, UserProfileMixin, {
  store: service(),

  initialEditableAttrsValues: null,

  attrsStateIsDirty: createIsDirtyComputed(editableAttrs),

  init() {
    this._super(...arguments);

    set(this, 'userAttributes', [
      {
        label: 'Google+',
        userAttributeKey: this._createUserAttrKey('profile.accounts.googlePlus'),
        placeholder: 'e.g. https://plus.google.com/112233445566778899000'
      },
      {
        label: 'LinkedIn',
        userAttributeKey: this._createUserAttrKey('profile.accounts.linkedIn'),
        placeholder: 'e.g. https://www.linkedin.com/in/christinaLuckasson'
      },
      {
        label: 'Twitter',
        userAttributeKey: this._createUserAttrKey('profile.accounts.twitter'),
        placeholder: 'e.g. @christinaLuckasson'
      },
      {
        label: 'Research Gate',
        userAttributeKey: this._createUserAttrKey('profile.accounts.researchGate'),
        placeholder: 'e.g. https://www.researchgate.net/profile/Christina_Luckasson'
      },
      {
        label: 'ORCID',
        userAttributeKey: this._createUserAttrKey('profile.accounts.orcid'),
        placeholder: 'e.g. https://orcid.org/0000-0000-0000-0000'
      }
    ]);

    set(this, 'initialEditableAttrsValues', this._getEditableAttributeValues(editableAttrs));
  },

  didReceiveAttrs() {
    this._super(...arguments);
    if (isEmpty(get(this, 'userProfileData.profile.accounts'))) {
      set(this, 'userProfileData.profile.accounts', {});
    }
  }
});
