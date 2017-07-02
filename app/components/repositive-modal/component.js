import Ember from 'ember';
import ModalDialog from 'ember-modal-dialog/components/modal-dialog';

const { setProperties } = Ember;

export default ModalDialog.extend({
  clickOutsideToClose: true,
  init() {
    this._super(...arguments);

    setProperties(this, {
      containerClassNames: ['bc-white', 'rounded', 'fixed', 'overflow-hidden', 'u-zindex-modal'],
      overlayClassNames: ['fixed', 'left-0', 'right-0', 'top-0', 'bottom-0', 'u-full-viewport-height',
        'bc-overlay-light-grey', 'u-zindex-overlay']
    });
  }
});
