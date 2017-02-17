import Ember from 'ember';

const { Component } = Ember;

export default Component.extend({
  tagName: 'ul',
  classNames: ['o-list-flush-left', 'u-mb0'],
  notifications: [
    {
      id: 'notif1',
      status: 'unread',
      context: {
        userName: 'Dan Fair',
        user_img: 'https://dg2kcfbxc77v1.cloudfront.net/assets/images/avatar/frog-1ee2413df3627d1724a7f26ff7f9fc3a.png',
        action: 'comment',
        subscribableTitle: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.'
      },
      createdAt: new Date().toISOString()
    }
  ]
});
