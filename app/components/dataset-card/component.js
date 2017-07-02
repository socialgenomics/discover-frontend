import Ember from 'ember';
import { mergeAssays } from 'repositive/routes/datasets/detail';

const { Component, computed, inject: { service }, get } = Ember;

export default Component.extend({
  urlGenerator: service(),

  type: 'dataset',

  classNames: ['grid__col', 'grid__col--1-of-3', 'grid__col--m-1-of-2'],

  hasAssays: computed.or('dataset{assay,properties.attributes.assay}'),

  shareUrl: computed('type', 'dataset.id', function () {
    const route = get(this, 'type') === 'request' ? 'requests.detail' : 'datasets.detail';

    return get(this, 'urlGenerator').generateUrl(route, get(this, 'dataset.id'));
  }),

  assaysToDisplay: computed('dataset{assay,properties.attributes.assay}', function() {
    return mergeAssays(get(this, 'dataset'));
  })
});
