import Ember from 'ember';
import BaseAdapter from 'ember-metrics/metrics-adapters/base';
import objectTransforms from 'ember-metrics/utils/object-transforms';

const { copy, get } = Ember;
const { compact } = objectTransforms;

export default BaseAdapter.extend({
  toStringExtension() {
    return 'survicate';
  },
  /* eslint-disable */
  init(options = {}) {
    const config = copy(get(this, 'config'));
    const { code } = config || {};
    const compactedOptions = compact(options);
    const { username } = compactedOptions;

    (function(w) {
      w._sv = w._sv || {};
      w._sv.trackingCode = code;
      // w._sv.identify = username; TODO will add user tacking next
      var s = document.createElement('script');
      s.src = '//api.survicate.com/assets/survicate.js';
      s.async = true;
      var e = document.getElementsByTagName('script')[0];
      e.parentNode.insertBefore(s, e);
    })(window);
  }
  /* eslint-enable */
});
