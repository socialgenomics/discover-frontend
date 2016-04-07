import Ember from 'ember';
import BaseAdapter from 'ember-metrics/metrics-adapters/base';
import objectTransforms from 'ember-metrics/utils/object-transforms';
// import ENV from 'repositive/config/environment';

const { copy, get } = Ember;
const { compact } = objectTransforms;

export default BaseAdapter.extend({
  toStringExtension() {
    return 'gosquared';
  },

  init() {
    const config = copy(get(this, 'config'));
    const { token, signature } = config;

    /* jshint ignore:start */
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
    /* jshint ignore:end */

    window._gs(token); // site token, setting to false disables automatic tracking
    window._gs('set', 'trackLocal', false); // set to true for testing
    window._gs('auth', signature); // secure mode, signature
  },

  identify(options = {}) {
    const compactedOptions = compact(options);
    const { email, inviteCode, firstname, lastname, username } = compactedOptions;
    const fullname = firstname + ' ' + lastname;

    window._gs('identify', {
      id: username,
      name: fullname,
      email: email,
      custom: {
        inviteCode: inviteCode
      }
    });
  },

  trackEvent(options = {}) {
    let { category, action, label, value } = options;
    let actionName = category + ' ' + action;
    window._gs('event', actionName, {
      label: label,
      value: value
    });
  },

  trackPage(options={}) {
    let { path, title } = options;
    window._gs('track', path, title);
  },

  willDestroy() {
    window._gs('unidentify');
    delete window._gs;
  }
});
