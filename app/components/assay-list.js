import Ember from 'ember';

const { Component, computed, get } = Ember;

export default Component.extend({
  classNames: ['u-flex', 'o-list-flush-left', 'u-mb0'],
  tagName: 'ul',
  assaysToDisplay: computed('datasetAssays', 'propertiesAssays', 'userAssays', function() {
    const assaysFromDataset = get(this, 'datasetAssays');
    const assaysFromProps = get(this, 'propertiesAssays');
    const assaysFromUsers = get(this, 'userAssays') || [];
    if (assaysFromProps) { return [...assaysFromProps, ...assaysFromUsers]; }
    if (assaysFromDataset) { return [...assaysFromDataset.split(','), ...assaysFromUsers]; }
    return assaysFromUsers;
  })
});
