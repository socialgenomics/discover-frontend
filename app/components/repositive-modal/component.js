import Ember from 'ember';
import ModalDialog from 'ember-modal-dialog/components/modal-dialog';

export default ModalDialog.extend({
  containerClassNames: ['u-bc-white', 'u-rounded', 'u-pos-fixed', 'u-overflow-hidden', 'c-modal'],
  overlayClassNames: ['u-pos-fixed', 'u-pos-left0', 'u-pos-right0', 'u-pos-top0', 'u-pos-bottom0', 'u-full-viewport-height',
    'u-bc-overlay-light-grey', 'u-zindex-overlay'],
  clickOutsideToClose: true,
  targetAttachment: 'center'
});
