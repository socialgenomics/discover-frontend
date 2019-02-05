import Component from '@ember/component';
import { get } from '@ember/object';

export default Component.extend({
  tagName: '',
  content: null,
  // TODO uncomment that line and add a service to show error notification. but first check if there is one already
  // showErrorNotification: false,

  pendingComponent: 'async-block/pending',
  errorComponent: 'async-block/error',
  fulfilledComponent: 'async-block/fulfilled',

  didReceiveAttrs() {
    this._super(...arguments);
    if (!get(this, 'content')) {
      throw new Error('missing the content property (positional parameter)');
    }
  }
}).reopenClass({
  positionalParams: ['content']
});
