import Ember from 'ember';
import ENV from 'repositive/config/environment';

export default Ember.Mixin.create({
  location: ENV.locationType,
  metrics: Ember.inject.service(),

  didTransition() {
    this._super(...arguments);
    if (ENV.metricsAdapters[2].environments.indexOf(ENV.environment) >= 0) {
      this._trackPage();
    } else {
      this._logTracking();
    }
  },

  _trackPage() {
    Ember.run.scheduleOnce('afterRender', this, () => {
      const page = document.location.href;
      const title = Ember.getWithDefault(this, 'currentRouteName', 'unknown');

      Ember.get(this, 'metrics').trackPage({ page, title });
    });
  },

  _logTracking() {
    const page = document.location.href;
    const title = Ember.getWithDefault(this, 'routeName', 'unknown');
    Ember.Logger.info('Tracking:', { page, title });
  }
});
