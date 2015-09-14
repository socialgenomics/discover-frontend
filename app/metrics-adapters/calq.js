import Ember from 'ember';
import canUseDOM from 'ember-metrics/utils/can-use-dom';
import objectTransforms from 'ember-metrics/utils/object-transforms';
import BaseAdapter from 'ember-metrics/metrics-adapters/base';

const {
  isPresent,
  copy,
  assert,
  merge,
  get,
  $,
  String: { capitalize },
} = Ember;
const { compact } = objectTransforms;

export default BaseAdapter.extend({
  toStringExtension() {
    return 'calq';
  },

  init() {
    const config = copy(get(this, 'config'));
    const { id } = config;

    assert(`[ember-metrics] You must pass a valid \`id\` to the ${this.toString()} adapter`, id);


    if (canUseDOM) {
      /* jshint ignore:start */
      (function (e, t) {
        if (!t.__SV) {
          window.calq = t;
          var n = e.createElement("script");
          n.type = "text/javascript";
          n.src = "http" + ("https:" === e.location.protocol ? "s" : "") + '://api.calq.io/lib/js/core-1.0.js';
          n.async = !0; var r = e.getElementsByTagName("script")[0];
          r.parentNode.insertBefore(n, r);
          t.init = function (e, o) {
            if (t.writeKey) return;
            t.writeKey = e;
            t._initOptions = o;
            t._execQueue = [];
            var m = "action.track action.trackSale action.trackHTMLLink action.trackPageView action.setGlobalProperty user.profile user.identify user.clear".split(" "); 
            for (var n = 0; n < m.length; n++) {
              var f = function () {
                var r = m[n];
                var s = function () {
                  t._execQueue.push({ m: r, args: arguments }) };
                  var i = r.split(".");
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
      /* jshint ignore:end */
      calq.init(id);
    }
  },

  identify(options = {}) {
    const compactedOptions = compact(options);
    const { email, inviteCode } = compactedOptions;
    window.calq.user.identify(email);
    window.calq.user.profile({inviteCode});
  },

  trackEvent(options = {}) {
    const compactedOptions = compact(options);
    window.calq.action.track(options);

    return options;
  },

  trackPage(options = {}) {
    const compactedOptions = compact(options);
    //calq.action.trackPageView();
    return options;
  },

  alias() {

  }
});
