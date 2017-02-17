import Ember from 'ember';

const { Component } = Ember;

export default Component.extend({
  notifications: [
    {
      id: 'notif1',
      status: 'unread',
      context: {
        summary: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.'
      },
      createdAt: new Date().toISOString()
    }
  ]
});
