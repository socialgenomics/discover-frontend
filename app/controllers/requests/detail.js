import Ember from 'ember';

const { Controller, computed, inject: { service }, get } = Ember;

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
    if (get(itemA, 'createdAt') < get(itemB, 'createdAt')) {
      return 1;
    } else if (get(itemA, 'createdAt') > get(itemB, 'createdAt')) {
      return -1;
    }
    return 0;
  })
});
