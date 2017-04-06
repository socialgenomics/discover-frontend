import Ember from 'ember';
import ENV from 'repositive/config/environment';
import FlashMessageMixin from 'repositive/mixins/flash-message-mixin';

const { Controller, computed, Logger, get, set, setProperties, inject: { service }, RSVP } = Ember;

export default Controller.extend(FlashMessageMixin, {
  ajax: service(),

  actions: {
    submitForm() {
      if (!get(this, 'isDisabled')) {
        set(this, 'loading', true);
        if (get(this, 'password1') !== get(this, 'password2')) {
          set(this, 'loading', false);
          return RSVP.reject(this._addFlashMessage(`Passwords do not match.`, 'warning'));
        } else {
          return get(this, 'ajax').request(ENV.APIRoutes['reset-password'], {
            method: 'POST',
            data: {
              token: get(this, 'resetKey'),
              password: get(this, 'password1')
            }
          })
            .then(() => {
              setProperties(this, {
                loading: false,
                passwordChanged: true
              });
            })
            .catch(err => {
              set(this, 'loading', false);
              Logger.error(err);
            });
        }
      } else {
        return RSVP.resolve();
      }
    }
  }
});
