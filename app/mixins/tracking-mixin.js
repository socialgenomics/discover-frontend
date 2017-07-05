import Ember from 'ember';
import ENV from 'repositive/config/environment';

const { Mixin, inject: { service }, run, getWithDefault, get, Logger } = Ember;

export default Mixin.create({
  metrics: service(),

  location: ENV.locationType,

  didTransition() {
    this._super(...arguments);
    if (ENV.metricsAdapters[2].environments.indexOf(ENV.environment) >= 0) {
      this._trackPage();
    } else {
      this._logTracking();
    }
  },

  _trackPage() {
    run.scheduleOnce('afterRender', this, () => {
      const page = document.location.href;
      const title = getWithDefault(this, 'currentRouteName', 'unknown');

      get(this, 'metrics').trackPage({ page, title });
    });
  },

  _logTracking() {
    const page = document.location.href;
    const title = getWithDefault(this, 'routeName', 'unknown');
    Logger.info('Tracking:', { page, title });
  }
});
