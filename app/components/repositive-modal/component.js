import TetherDialog from 'ember-modal-dialog/components/tether-dialog';

export default TetherDialog.extend({
  containerClassNames: ['u-bc-white', 'u-rounded', 'fixed', 'u-overflow-hidden', 'u-zindex-modal'],
  overlayClassNames: ['fixed', 'left-0', 'right-0', 'top-0', 'bottom-0', 'u-full-viewport-height',
    'u-bc-overlay-light-grey', 'u-zindex-overlay'],
  clickOutsideToClose: true
});
