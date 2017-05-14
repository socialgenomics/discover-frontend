import Ember from 'ember';
import ButtonMixin from 'repositive/mixins/rui/r-button-mixin';

const { Component, get } = Ember;

export default Component.extend(ButtonMixin, {
  layoutName: 'components/rui/r-button',
  tagName: 'button',
  attributeBindings: ['disabled'],

  click() {
    const clickHandler = get(this, 'clickHandler');

    if (clickHandler) { clickHandler(); }
  }
});
