import Ember from 'ember';
import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';
import sinon from 'sinon';

describe('Integration | Component | notification list item', function() {
  setupComponentTest('notification-list-item', {
    integration: true
  });

  const requestId = {
    'requestId': {
      content: {},
      title: 'Request Title',
      id: 'someId'
    },
    subscribableModel: 'request'
  };

  const datasetId = {
    'datasetId': {
      content: {},
      title: 'Dataset Title',
      id: 'someId'
    },
    subscribableModel: 'dataset'
  };

  function buildNotificationObj(subscriptionId) {
    return Ember.Object.create({
      createdAt: new Date().toISOString(),
      properties: {
        type: 'action',
        action: {
          type: 'comment',
          userId: {
            displayName: 'Cat Dog',
            profile: {
              avatar: '/assets/images/avatar/lizard.png'
            }
          }
        }
      },
      subscriptionId
    });
  }

  describe('if the notification is from an action', function() {
    it(`shows the user's name and avatar`, function() {
      this.set('notification', buildNotificationObj(datasetId));
      this.render(hbs`{{notification-list-item notification=notification}}`);
      expect(this.$('.c-notification-img-date-container').text().trim()).to.eql('a few seconds ago');
      expect(this.$('span:first').text().trim()).to.eql('Cat Dog');
      expect(this.$('img').attr('src')).to.eql('/assets/images/avatar/lizard.png');
    });

    it(`there is moment converted date text`, function() {
      this.set('notification', buildNotificationObj(datasetId));
      this.render(hbs`{{notification-list-item notification=notification}}`);
      expect(this.$('.c-notification-img-date-container').text().trim()).to.eql('a few seconds ago');
    });
  });


  it(`correct action text is shown for each action type`, function() {
    const notification = buildNotificationObj(datasetId);
    this.set('notification', notification);
    this.render(hbs`{{notification-list-item notification=notification}}`);
    expect(this.$('.c-notification-body span:nth-child(2)').text().trim()).to.eql('commented on');
    this.set('notification.properties.action.type', 'tag');
    expect(this.$('.c-notification-body span:nth-child(2)').text().trim()).to.eql('added a tag to');
    this.set('notification.properties.action.type', 'share');
    expect(this.$('.c-notification-body span:nth-child(2)').text().trim()).to.eql('shared');
    this.set('notification.properties.action.type', 'favourite');
    expect(this.$('.c-notification-body span:nth-child(2)').text().trim()).to.eql('favourited');
  });

  it(`shows dataset title when subscribable is dataset`, function() {
    this.set('notification', buildNotificationObj(datasetId));
    this.render(hbs`{{notification-list-item notification=notification}}`);
    expect(this.$('.c-notification-body p').text().trim()).to.eql('Dataset Title');
  });

  it(`shows request title when subscribable is request`, function() {
    this.set('notification', buildNotificationObj(requestId));
    this.render(hbs`{{notification-list-item notification=notification}}`);
    expect(this.$('.c-notification-body p').text().trim()).to.eql('Request Title');
  });

  // Actions tests

  it(`when notification is clicked, status is set to read`, function() {
    this.set('notification', buildNotificationObj(datasetId));
    this.setProperties({
      'transitionToSubscribable': sinon.stub(),
      'close': sinon.stub(),
      'notification.save': sinon.stub().returns({ 'then': sinon.stub() })
    });
    this.render(hbs`{{notification-list-item
      notification=notification
      close=close
      transitionToSubscribable=transitionToSubscribable}}`);
    this.$('>').click();
    expect(this.get('notification.status')).to.eql('read');
  });

  it(`when notification is clicked, transitionToSubscribable is called with correct args`, function() {
    this.set('notification', buildNotificationObj(datasetId));
    this.setProperties({
      'transitionToSubscribable': sinon.spy(),
      'close': sinon.stub(),
      'notification.save': sinon.stub().returns({ 'then': sinon.stub() })
    });
    this.render(hbs`{{notification-list-item
      notification=notification
      close=close
      transitionToSubscribable=transitionToSubscribable}}`);
    this.$('>').click();
    expect(this.get('transitionToSubscribable').calledWith('dataset', 'someId')).to.be.true;
  });

  it(`when notification is clicked, close is called with the dropdown`, function() {
    this.set('notification', buildNotificationObj(datasetId));
    this.setProperties({
      'transitionToSubscribable': sinon.stub(),
      'close': sinon.spy(),
      'notification.save': sinon.stub().returns({ 'then': sinon.stub() }),
      'dropdown': {}
    });
    this.render(hbs`{{notification-list-item
      notification=notification
      close=close
      transitionToSubscribable=transitionToSubscribable
      dropdown=dropdown
    }}`);
    this.$('>').click();
    expect(this.get('close').calledWith({})).to.be.true;
  });
});
