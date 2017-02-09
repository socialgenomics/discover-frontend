import Ember from 'ember';

const { Component } = Ember;

export default Component.extend({
  init(){
    this._super(...arguments);
    var qs, js, q, s, d = document,
      gi = d.getElementById,
      ce = d.createElement,
      gt = d.getElementsByTagName,
      id = 'typef_orm',
      b = 'https://s3-eu-west-1.amazonaws.com/share.typeform.com/';
    if (!gi.call(d, id)) {
      js = ce.call(d, 'script');
      js.id = id;
      js.src = b + 'widget.js';
      q = gt.call(d, 'script')[0];
      q.parentNode.insertBefore(js, q);
    }

  },

  didRender() {
    console.debug('Initializing typeform');
    try {
      // run typeform code
      new window.Typeform.Widget();
    } catch (e) {
      console.error('Error running type form code', e);
    }
  }
});
