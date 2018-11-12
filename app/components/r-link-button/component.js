import Button from '../r-button/component';

export default Button.extend({
  tagName: 'a',
  attributeBindings: ['href', 'target'],
  type: null
});
