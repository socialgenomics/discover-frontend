import Ember from 'ember';

const { Component, computed } = Ember;

export default Component.extend({
  classNames: ['u-flex', 'u-self-stretch', 'u-shrink-none', 'u-items-center', 'u-justify-center', 'u-hv-bc-off-white'],
  classNameBindings: ['hasNotifications:u-tc-red:u-tc-secondary'],
  hasNotifications: computed.notEmpty('notifications'),
  actions: {
    close(dropdown) {
      dropdown.actions.close();
    }
  }
});
