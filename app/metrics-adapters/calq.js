import Ember from 'ember';
import canUseDOM from 'ember-metrics/utils/can-use-dom';
import objectTransforms from 'ember-metrics/utils/object-transforms';
import BaseAdapter from 'ember-metrics/metrics-adapters/base';
import ENV from 'repositive/config/environment';

const {
  copy,
  assert,
  get
} = Ember;

const { compact } = objectTransforms;

export default BaseAdapter.extend({
  toStringExtension() {
    return 'calq';
  },

  init() {
    const config = copy(get(this, 'config'));
    const { id } = config;

    assert(`[ember-metrics] You must pass a valid *id* to the ${this.toString()} adapter`, id);


    if (canUseDOM) {
      /* jshint ignore:start */
      (function (e, t) {
        if (!t.__SV) {
          window.calq = t;
          var n = e.createElement('script');
          n.type = 'text/javascript';
          n.src = 'http' + ('https:' === e.location.protocol ? 's' : '') + '://api.calq.io/lib/js/core-1.0.js';
          n.async = !0; var r = e.getElementsByTagName('script')[0];
          r.parentNode.insertBefore(n, r);
          t.init = function (e, o) {
            if (t.writeKey) {
              return;
            }
            t.writeKey = e;
            t._initOptions = o;
            t._execQueue = [];
            var m = 'action.track action.trackSale action.trackHTMLLink action.trackPageView action.setGlobalProperty user.profile user.identify user.clear'.split(' ');
            for (var n = 0; n < m.length; n++) {
              var f = function () {
                var r = m[n];
                var s = function () {
                  t._execQueue.push({ m: r, args: arguments }) };
                var i = r.split('.');
                if (i.length == 2) {
                  if (!t[i[0]]) { t[i[0]] = [] }
                  t[i[0]][i[1]] = s
                } else {
                  t[r] = s
                }
              }();
            }
          };
          t.__SV = 1
        }
      })(document, window.calq || []);
      calq.init(id);
      /* jshint ignore:end */
    }
  },

  identify(options = {}) {
    const compactedOptions = compact(options);
    const { email, firstname, lastname, username, id } = compactedOptions;
    const fullname = firstname + ' ' + lastname;
    window.calq.user.identify(username | id);
    window.calq.user.profile({ '$full_name': fullname, '$email': email });
    window.calq.user.profile({ email, firstname, lastname, username | id });
  },

  trackEvent(options = {}) {
    //const compactedOptions = compact(options);
    if (ENV.environment === 'production') {
      var actionName = options.category + '.' + options.action;
      delete options.category;
      delete options.action;
      window.calq.action.track(actionName, options);
    }
    return options;
  },

  trackPage(options = {}) {
    //const compactedOptions = compact(options);
    window.calq.action.trackPageView();
    return options;
  },

  alias() {
  },

  willDestroy() {
  }
});
