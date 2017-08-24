import Ember from 'ember';
import BaseAdapter from 'ember-metrics/metrics-adapters/base';
import objectTransforms from 'ember-metrics/utils/object-transforms';
import canUseDOM from 'ember-metrics/utils/can-use-dom';

const { $, assert, get } = Ember;
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
    const { appId } = get(this, 'config');
    const compactedOptions = compact(options);
    const { email, firstname, lastname, username } = compactedOptions;
    const userId = compactedOptions.id;
    const fullname = firstname + ' ' + lastname;
    const method = this.booted ? 'update' : 'boot';
    const props = {
      app_id: appId,
      user_id: username || userId,
      name: fullname,
      email: email
    };

    if (canUseDOM) {
      window.Intercom(method, props);
      this.booted = true;
    }
  },

  trackEvent(options = {}) {
    const { category, action, label, value } = options;
    const actionName = category + ' ' + action;
    const eventData = { label, value };
    if (canUseDOM) {
      window.Intercom('trackEvent', actionName, eventData);
    }
  },

  trackPage(options = {}) {
    const { page, title } = options;
    const action = 'navigate: ' + title;
    const eventData = { page, title };
    if (canUseDOM) {
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
