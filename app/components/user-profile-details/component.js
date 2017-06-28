import Ember from 'ember';
import { buildValidations } from 'ember-cp-validations';
import presenceValidator from 'repositive/validations/presenceValidator';
import lengthValidator from 'repositive/validations/lengthValidator';
import { lengths, lengthTypes } from 'repositive/validations/validations-config';
import FlashMessageMixin from 'repositive/mixins/flash-message-mixin';
import UserProfileMixin, { createIsDirtyComputed, createUserAttrKey } from 'repositive/mixins/user-edit-profile-mixin';

const { Component, inject: { service }, set } = Ember;
const Validations = buildValidations({
  [createUserAttrKey('profile.bio')]: [
    lengthValidator(lengths.description, lengthTypes.max)
  ],
  [createUserAttrKey('firstname')]: [
    presenceValidator(),
    lengthValidator(lengths.textFieldShort, lengthTypes.max)
  ],
  [createUserAttrKey('lastname')]: [
    presenceValidator(),
    lengthValidator(lengths.textFieldShort, lengthTypes.max)
  ],
  [createUserAttrKey('profile.work_organisation')]: lengthValidator(lengths.textFieldLong, lengthTypes.max),
  [createUserAttrKey('profile.work_role')]: lengthValidator(lengths.textFieldLong, lengthTypes.max),
  [createUserAttrKey('profile.location')]: lengthValidator(lengths.textFieldLong, lengthTypes.max)
});

const editableAttrs = ['firstname', 'lastname', 'profile.bio', 'profile.work_organisation', 'profile.work_role',
  'profile.location'];

export default Component.extend(Validations, FlashMessageMixin, UserProfileMixin, {
  store: service(),

  attrsStateIsDirty: createIsDirtyComputed(editableAttrs),

  init() {
    this._super(...arguments);

    set(this, 'userAttributes', [
      {
        label: 'Short Bio (max 250 characters)',
        multiline: true,
        placeholder: 'Tell us a bit more what are you working on.',
        userAttributeKey: this._createUserAttrKey('profile.bio')
      },
      {
        label: 'First Name',
        placeholder: 'e.g. Christina',
        userAttributeKey: this._createUserAttrKey('firstname')
      },
      {
        label: 'Last Name',
        placeholder: 'e.g. Luckasson',
        userAttributeKey: this._createUserAttrKey('lastname')
      },
      {
        label: 'Affiliation',
        placeholder: 'e.g. Bioinformatician at XYZ Institute',
        userAttributeKey: this._createUserAttrKey('profile.work_organisation')
      },
      {
        label: 'Job Role',
        placeholder: 'e.g. Postdoctoral Researcher',
        userAttributeKey: this._createUserAttrKey('profile.work_role')
      },
      {
        label: 'Location',
        placeholder: 'e.g. Cambridge, UK',
        userAttributeKey: this._createUserAttrKey('profile.location')
      }
    ]);

    set(this, 'initialEditableAttrsValues', this._getEditableAttributeValues(editableAttrs));
  }
});
