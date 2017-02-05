import TetherDialog from 'ember-modal-dialog/components/tether-dialog';

export default TetherDialog.extend({
  containerClassNames: ['u-bc-white', 'u-rounded', 'u-pos-fixed', 'u-overflow-hidden', 'u-zindex-modal'],
  overlayClassNames: ['u-pos-fixed', 'u-pos-left0', 'u-pos-right0', 'u-pos-top0', 'u-pos-bottom0', 'u-full-viewport-height',
    'u-bc-overlay-light-grey', 'u-zindex-overlay'],
  clickOutsideToClose: true
});
