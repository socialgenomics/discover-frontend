import Ember from 'ember';
import colours from '../utils/colours';

const { Component, computed, inject: { service }, get } = Ember;

export default Component.extend({
  urlGenerator: service(),

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
    this.$('.tooltipped').tooltip({ delay: 300 });
  },
  actions: {
    toggleModal() {
      this.sendAction('toggleModal');
    }
  },
  getAssayColourForDataset: function() {
    let assay;
    const dataset = this.dataset;
    if (dataset) {
      assay = dataset.get('assay');
      if (!assay) {
        assay = 'Not Available';
      }
    }
    return colours.getColour(assay);
  },
  setAssayColourForDataset: function() {
    if (this.dataset) {
      const colour = this.getAssayColourForDataset();
      if (colour) {
        this.dataset.set('colour', colour);
      }
    }
  }
});
