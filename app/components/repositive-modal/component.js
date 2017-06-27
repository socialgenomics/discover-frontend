/* eslint ember/avoid-leaking-state-in-components: 0 */

import ModalDialog from 'ember-modal-dialog/components/modal-dialog';

export default ModalDialog.extend({
  // shared across all instances of this component
  containerClassNames: ['bc-white', 'rounded', 'fixed', 'overflow-hidden', 'u-zindex-modal'],
  overlayClassNames: ['fixed', 'left-0', 'right-0', 'top-0', 'bottom-0', 'u-full-viewport-height',
    'bc-overlay-light-grey', 'u-zindex-overlay'],
  clickOutsideToClose: true
});
