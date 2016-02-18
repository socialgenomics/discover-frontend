import Ember from 'ember';
import BaseAdapter from 'ember-metrics/metrics-adapters/base';
// import ENV from 'repositive/config/environment';

export default BaseAdapter.extend({
  toStringExtension() {
    return 'gosquared';
  },
  session: Ember.inject.service(),

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

  identify() {
    _gs('identify', {
      id:    session.authenticatedUser.id,
      name:  session.authenticatedUser.displayName,
      email: session.authenticatedUser.email
    });
  },

  trackEvent() {
  },

  trackPage() {
  },

  alias() {
  }
});
