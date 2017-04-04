import Ember from 'ember';

const { Component, computed, inject: { service }, get } = Ember;

export default Component.extend({
  urlGenerator: service(),
  classNames: ['grid__col', 'grid__col--1-of-3', 'grid__col--m-1-of-2'],
  shareUrl: computed('type', 'dataset.id', function () {
    const route = get(this, 'type') === 'request' ? 'requests.detail' : 'datasets.detail';

    return get(this, 'urlGenerator').generateUrl(route, get(this, 'dataset.id'));
  }),
  hasAssays: computed.or('dataset.assay', 'dataset.properties.attributes.assay'),
  assaysToDisplay: computed('dataset.assay', 'dataset.properties.attributes.assay', 'dataset.userAssays', function() {
    const assaysFromDataset = get(this, 'dataset.assay');
    const assaysFromProps = get(this, 'dataset.properties.attributes.assay');
    const assaysFromUsers = get(this, 'dataset.userAssays') || [];
    if (assaysFromProps) { return [...assaysFromProps, ...assaysFromUsers]; }
    if (assaysFromDataset) { return [...assaysFromDataset.split(','), ...assaysFromUsers]; }
    return assaysFromUsers;
  })
});
