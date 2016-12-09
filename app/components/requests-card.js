import Ember from 'ember';

const { Component, computed, inject: { service }, get } = Ember;

export default Component.extend({
  urlGenerator: service(),

  datasetUrl: computed('dataset.id', function () {
    return get(this, 'urlGenerator').generateUrl('datasets.detail', get(this, 'dataset.id'));
  }),

  didRender() {
    this._super(...arguments);
    this.$('.tooltipped').tooltip({ delay: 300 });
  },
  actions: {
    toggleModal() {
      this.sendAction('toggleModal');
    }
  }
});
