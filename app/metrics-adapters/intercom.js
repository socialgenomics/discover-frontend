import Ember from 'ember';
import BaseAdapter from 'ember-metrics/metrics-adapters/base';
import objectTransforms from 'ember-metrics/utils/object-transforms';

const { copy, get } = Ember;
const { compact } = objectTransforms;

export default BaseAdapter.extend({
  toStringExtension() {
    return 'intercom';
  },

  init() {
    (function() {
      var w = window;
      var ic = w.Intercom;
      if (typeof ic === 'function') {
        ic('reattach_activator');
        ic('update', intercomSettings);
      } else {
        var d = document;
        var i = function() {
          i.c(arguments);
        };
        i.q = [];
        i.c = function(args) {
          i.q.push(args);
        };
        w.Intercom = i;

        function l() {
          var s = d.createElement('script');
          s.type = 'text/javascript';
          s.async = true;
          s.src = 'https://widget.intercom.io/widget/blyi5u84';
          var x = d.getElementsByTagName('script')[0];
          x.parentNode.insertBefore(s, x);
        }
        if (w.attachEvent) {
          w.attachEvent('onload', l);
        } else {
          w.addEventListener('load', l, false);
        }
      }
    })();
  },

  identify(options = {}) {
    const config = copy(get(this, 'config'));
    const { id } = config;
    const compactedOptions = compact(options);
    const { email, firstname, lastname, username } = compactedOptions;
    const fullname = firstname + ' ' + lastname;

    window.Intercom('boot', {
      app_id: id,
      user_id: username,
      name: fullname,
      email: email
    });

    window.Intercom('update');
  },

  trackEvent() {
  },

  trackPage() {
  },

  alias() {
  }
});
