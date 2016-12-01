import Ember from 'ember';
import colours from '../utils/colours';

const { Component, get, set, $ } = Ember;

export default Component.extend({
  didReceiveAttrs() {
    this._super(...arguments);
    this.setAssayColourForDataset();
  },

  didRender() {
    this._super(...arguments);
    $('.tooltipped').tooltip({ delay: 300 });
  },

  getAssayColourForDataset() {
    let assay;
    const dataset = get(this, 'dataset');
    if (dataset) {
      assay = get(dataset, 'assay');
      if (!assay) {
        assay = 'Not Available';
      }
    }
    return colours.getColour(assay);
  },

  setAssayColourForDataset() {
    if (get(this, 'dataset')) {
      const colour = this.getAssayColourForDataset();
      if (colour) {
        set(this, 'dataset.colour', colour);
      }
    }
  }
});
