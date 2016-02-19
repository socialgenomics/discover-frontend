import Ember from 'ember';
import objectTransforms from 'ember-metrics/utils/object-transforms';
import BaseAdapter from 'ember-metrics/metrics-adapters/base';
// import ENV from 'repositive/config/environment';
import ajax from 'ic-ajax';

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

    ajax({
      url: 'http://api.gosquared.com/tracking/v1/identify?api_key=FXSKFOKS3ELCYLTM&site_token=GSN-041822-M',
      data: {
        person_id: username,
        properties: {
          id: username,
          first_name: firstname,
          last_name: lastname,
          email: email,
          name: fullname
        }
      },
      type: 'POST'
    })
    .then(resp => {
      console.log(111);
    })
    .catch(resp => {
      console.log(2222);
    })
  },

  trackEvent() {
  },

  trackPage() {
  },

  alias() {
  }
});
