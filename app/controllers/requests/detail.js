import Ember from 'ember';

const { Controller, computed, inject: { service } } = Ember;

export default Controller.extend({
  session: service(),

  requestEditableProperties: [
    { key: 'title' },
    { key: 'description', multiline: true }
  ],

  request: computed.alias('model.request'),
  comments: computed.filterBy('request.actionableId.actions', 'type', 'comment'),
  tags: computed.filterBy('request.actionableId.actions', 'type', 'tag'),

  commentsSorted: computed.sort('comments', (itemA, itemB) => {
    if (itemA.get('createdAt') < itemB.get('createdAt')) {
      return 1;
    } else if (itemA.get('createdAt') > itemB.get('createdAt')) {
      return -1;
    }
    return 0;
  })
});
