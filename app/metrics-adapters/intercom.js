import Ember from 'ember';
import BaseAdapter from 'ember-metrics/metrics-adapters/base';
import objectTransforms from 'ember-metrics/utils/object-transforms';
import canUseDOM from 'ember-metrics/utils/can-use-dom';

const { $, assert, get, set } = Ember;
const { compact } = objectTransforms;

export default BaseAdapter.extend({
  booted: false,

  toStringExtension() { return 'Intercom'; },

  init() {
    const { appId } = get(this, 'config');

    assert(`[ember-metrics] You must pass a valid \`appId\` to the ${this.toString()} adapter`, appId);

    if (canUseDOM) {
      /* eslint-disable */
      (function(){var w=window;var ic=w.Intercom;if(typeof ic==="function"){ic('reattach_activator');ic('update',{});}else{var d=document;var i=function(){i.c(arguments)};i.q=[];i.c=function(args){i.q.push(args)};w.Intercom=i;function l(){var s=d.createElement('script');s.type='text/javascript';s.async=true;
      s.src=`https://widget.intercom.io/widget/${appId}`;
      var x=d.getElementsByTagName('script')[0];x.parentNode.insertBefore(s,x);} l(); }})()
      /* eslint-enable */
    }
  },

  identify(options = {}) {
    if (canUseDOM) {
      const { appId } = get(this, 'config');
      const compactedOptions = compact(options);
      const { email, firstname, lastname, username } = compactedOptions;
      const userId = compactedOptions.id;
      const fullname = firstname + ' ' + lastname;
      const method = get(this, 'booted') ? 'update' : 'boot';
      const props = {
        app_id: appId,
        user_id: username || userId,
        name: fullname,
        email: email
      };

      window.Intercom(method, props);
      set(this, 'booted', true);
    }
  },

  trackEvent(options = {}) {
    if (canUseDOM) {
      const { category, action, label, value } = options;
      const actionName = category + ' ' + action;
      const eventData = { label, value };

      window.Intercom('trackEvent', actionName, eventData);
    }
  },

  trackPage(options = {}) {
    if (canUseDOM) {
      const { page, title } = options;
      const action = 'navigate: ' + title;
      const eventData = { page, title };

      window.Intercom('trackEvent', action, eventData);
    }
  },

  willDestroy() {
    if (canUseDOM) {
      $('script[src*="intercom"]').remove();
      delete window.Intercom;
    }
  }
});
