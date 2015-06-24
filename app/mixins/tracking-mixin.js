import Ember from 'ember';
import ENV from 'repositive.io/config/environment';

export default Ember.Mixin.create({
  _pageHasGa: function() {
    return window.ga && typeof window.ga === "function" && ENV.TRACKING.ENABLED;
  },

  _logTrackingEnabled: function() {
    return ENV.TRACKING.LOG_EVENT_TRACKING;
  },

  _logTracking: function() {
    if (ENV.TRACKING.ENABLED){
      Ember.Logger.info('Tracking Google Analytics event: ', arguments);
    }
    else{
      Ember.Logger.info('FEIGNED: Tracking Google Analytics event: ', arguments);
    }
  },

  trackPageView: function(page) {
    if (this._pageHasGa()) {
      if (!page) {
        var loc = window.location;
        page = loc.hash ? loc.hash.substring(1) : loc.pathname + loc.search;
      }

      ga('send', 'pageview', page);
    }

    if (this._logTrackingEnabled()) {
      this._logTracking('pageview', page);
    }
  },

  trackEvent: function(category, action, label, value) {
    if (this._pageHasGa()) {
      ga('send', 'event', category, action, label, value);
    }

    if (this._logTrackingEnabled()) {
      this._logTracking('event', category, action, label, value);
    }
  }
});
