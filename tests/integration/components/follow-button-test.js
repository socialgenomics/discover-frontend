/* jshint expr:true */
import Ember from 'ember';
import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describe('Integration | Component | follow button', function() {
  setupComponentTest('follow-button', {
    integration: true
  });


  it('text is following when subscription is active', function() {
    const currentUserId = 'user1';
    const subscription = Ember.Object.create({
      id: 'dataset1',
      subscribable_model: 'dataset',
      active: true,
      userId: {
        id: currentUserId
      }
    });
    this.setProperties({
      'subscribable': Ember.Object.create({
        subscriptions: [subscription]
      }),
      'session': Ember.Object.create({
        authenticatedUser: {
          id: currentUserId
        }
      })
    });
    this.render(hbs`{{follow-button subscribable=subscribable session=session}}`);
    expect(this.$().text().trim()).to.eql('Following');
  });


  it('text is unfollow when subscription is active and isHovering', function() {
    const currentUserId = 'user1';
    const subscription = Ember.Object.create({
      id: 'dataset1',
      subscribable_model: 'dataset',
      active: true,
      userId: {
        id: currentUserId
      }
    });
    this.setProperties({
      'subscribable': Ember.Object.create({
        subscriptions: [subscription]
      }),
      'session': Ember.Object.create({
        authenticatedUser: {
          id: currentUserId
        }
      }),
      'isHovering': true
    });
    this.render(hbs`{{follow-button subscribable=subscribable session=session isHovering=isHovering}}`);
    expect(this.$().text().trim()).to.eql('Unfollow');
  });


  it('text is follow when subscription is not active', function() {
    const currentUserId = 'user1';
    const subscription = Ember.Object.create({
      id: 'dataset1',
      subscribable_model: 'dataset',
      active: false,
      userId: {
        id: currentUserId
      }
    });
    this.setProperties({
      'subscribable': Ember.Object.create({
        subscriptions: [subscription]
      }),
      'session': Ember.Object.create({
        authenticatedUser: {
          id: currentUserId
        }
      })
    });
    this.render(hbs`{{follow-button subscribable=subscribable session=session}}`);
    expect(this.$().text().trim()).to.eql('Follow');
  });


  it('text is follow when subscription does not exist', function() {
    const currentUserId = 'user1';
    this.setProperties({
      'subscribable': Ember.Object.create({
        subscriptions: []
      }),
      'session': Ember.Object.create({
        authenticatedUser: {
          id: currentUserId
        }
      })
    });
    this.render(hbs`{{follow-button subscribable=subscribable session=session}}`);
    expect(this.$().text().trim()).to.eql('Follow');
  });
});
