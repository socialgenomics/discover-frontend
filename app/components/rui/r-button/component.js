import BaseButton from '../r-button-base/component';

export default BaseButton.extend({
  classNameBindings: [
    'primary:c-btn-primary:c-btn-secondary',
    'raised:c-btn--shadow',
    'small:u-px2',
    'small:u-py1'
  ]
});
