import Ember from 'ember';
import colours from '../utils/colours';

const { Component, computed, inject: { service }, get, set, $ } = Ember;

export default Component.extend({
  urlGenerator: service(),
  classNames: ['grid__col', 'grid__col--1-of-3'],
  shareUrl: computed('type', 'dataset.id', function () {
    const route = get(this, 'type') === 'request' ? 'requests.detail' : 'datasets.detail';

    return get(this, 'urlGenerator').generateUrl(route, get(this, 'dataset.id'));
  }),

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
