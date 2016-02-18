import Ember from 'ember';
import objectTransforms from 'ember-metrics/utils/object-transforms';
import BaseAdapter from 'ember-metrics/metrics-adapters/base';
// import ENV from 'repositive/config/environment';

const { compact } = objectTransforms;

export default BaseAdapter.extend({
  toStringExtension() {
    return 'gosquared';
  },

  init() {
    ! function(g, s, q, r, d) {
      r = g[r] = g[r] || function() {
        (r.q = r.q || []).push(
          arguments);
      };
      d = s.createElement(q);
      q = s.getElementsByTagName(q)[0];
      d.src = '//d1l6p2sc9645hc.cloudfront.net/tracker.js';
      q.parentNode.
      insertBefore(d, q);
    }(window, document, 'script', '_gs');

    _gs('GSN-838111-G'); // site token
  },

  identify(options = {}) {
    const compactedOptions = compact(options);
    const { email, inviteCode, firstname, lastname, username } = compactedOptions;
    const fullname = firstname + ' ' + lastname;
    _gs('identify', {
      id:    username,
      name:  fullname,
      email: email,
      custom: {
        inviteCode: inviteCode
      }
    });
  },

  trackEvent() {
  },

  trackPage() {
  },

  alias() {
  }
});
