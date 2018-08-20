import Ember from 'ember';
import FlashMessageMixin from 'repositive/mixins/flash-message-mixin';
import TrackEventsMixin from 'repositive/mixins/track-events-mixin';
import { buildValidations } from 'ember-cp-validations';
import presenceValidator from 'repositive/validations/presenceValidator';
import ENV from 'repositive/config/environment'

const { Component, computed, inject: { service }, get, getProperties, setProperties, set } = Ember;
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
    isNHLBI: false,
    loading: false,

    shouldShowCheckbox: false,

    isInvalid: computed.not('validations.isValid'),

    didReceiveAttrs() {
      this._super(...arguments);

      const title = get(this, 'savedTitle');
      const description = get(this, 'savedDescription');
      const isNHLBI = get(this, 'savedIsNHLBI');

      const environment = get(ENV, 'environment');
      if (environment === 'local-development' || environment === 'staging') {
        // NOTE we want to show the NHLBI checkbox on local and dev only for now as well as FE localDev
        set(this, 'shouldShowCheckbox', true);
      }

      setProperties(this, { title, description, isNHLBI });
    },

    willDestroyElement() {
      this._super(...arguments);

      const requestObj = getProperties(this, 'title', 'description', 'isNHLBI');

      if (requestObj.title || requestObj.description || requestObj.isNHLBI) {
        get(this, 'saveForLater')(requestObj);
      }
    },

    actions: {
      addRequest() {
        if (get(this, 'validations.isValid')) {
          const requestObj = getProperties(this, 'title', 'description', 'isNHLBI');

          //NOTE: it makes sense to keep the isNHLBI accross requests
          setProperties(this, {title: null, description: null});
          this.saveForLater({isNHLBI: requestObj.isNHLBI});

          return this.submitRequest(requestObj);
        }
      }
    },

    saveForLater() {},
    submitRequest() {}
  }
);
