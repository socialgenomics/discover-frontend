import Ember from 'ember';

const { Component, computed, inject: { service }, get } = Ember;

export default Component.extend({
  urlGenerator: service(),

  datasetUrl: computed('dataset.id', function () {
    return get(this, 'urlGenerator').generateUrl('datasets.detail', get(this, 'dataset.id'));
  })
});
