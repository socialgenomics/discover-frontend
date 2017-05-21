import Ember from 'ember';
import ButtonMixin from 'repositive/mixins/rui/r-button-mixin';

const { Component, get } = Ember;

export default Component.extend(ButtonMixin, {
  layoutName: 'components/rui/r-button',
  tagName: 'button',
  attributeBindings: ['disabled', 'type'],
  type: 'button', // set default button type to avoid accidental fro submit on click

  click() {
    const clickHandler = get(this, 'clickHandler');

    if (clickHandler) { clickHandler(); }
  }
});
