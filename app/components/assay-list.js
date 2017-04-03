import Ember from 'ember';

const { Component, computed, get } = Ember;

export default Component.extend({
  classNames: ['o-list-inline', 'o-list-flush-left', 'u-mb0'],
  tagName: 'ul',
  assaysToDisplay: computed('datasetAssays', 'propertiesAssays', function() {
    const assaysFromDataset = get(this, 'datasetAssays');
    const assaysFromProps = get(this, 'propertiesAssays');
    if (assaysFromProps) { return assaysFromProps; }
    if (assaysFromDataset) { return assaysFromDataset.split(','); }
  })
});
