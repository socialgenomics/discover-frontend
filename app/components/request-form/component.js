import Ember from 'ember';
import FlashMessageMixin from 'repositive/mixins/flash-message-mixin';
import TrackEventsMixin from 'repositive/mixins/track-events-mixin';
import { buildValidations } from 'ember-cp-validations';
import presenceValidator from 'repositive/validations/presenceValidator';

const { Component, computed, inject: { service }, get, getProperties, setProperties } = Ember;
const Validations = buildValidations({
  title: presenceValidator(),
  description: presenceValidator()
});

export default Component.extend(
  Validations,
  FlashMessageMixin,
  TrackEventsMixin,
  {

    session: service(),
    store: service(),

    title: null,
    description: null,
    loading: false,

    isInvalid: computed.not('validations.isValid'),

    didReceiveAttrs() {
      this._super(...arguments);

      const title = get(this, 'savedTitle');
      const description = get(this, 'savedDescription');

      setProperties(this, { title, description });
    },

    willDestroyElement() {
      this._super(...arguments);

      const requestObj = getProperties(this, 'title', 'description');

      if (requestObj.title || requestObj.description) {
        get(this, 'saveForLater')(requestObj);
      }
    },

    actions: {
      addRequest() {
        if (get(this, 'validations.isValid')) {
          const requestObj = getProperties(this, 'title', 'description');

          setProperties(this, {title: null, description: null});

          return get(this, 'submitRequest')(requestObj);
        }
      }
    }
  }
);
