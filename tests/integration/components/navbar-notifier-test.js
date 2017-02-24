/*jshint expr:true*/
import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';
import { clickTrigger } from '../../helpers/ember-basic-dropdown';

function getNotificationObj() {
  return {
    id: '1',
    status: 'unread',
    context: {
      summary: 'You smell.'
    }
  };
}

describe('Integration | Component | navbar notifier', function() {
  setupComponentTest('navbar-notifier', {
    integration: true
  });

  it('bell is red when there are notifications', function() {
    this.set('notifications', [getNotificationObj()]);
    this.render(hbs`{{navbar-notifier notifications=notifications}}`);
    expect(this.$('div').hasClass('u-tc-red')).to.be.true;
    expect(this.$('i').css('color')).to.eql('rgb(229, 115, 115)');
  });

  it('bell is grey when there are no notifications', function() {
    this.set('notifications', []);
    this.render(hbs`{{navbar-notifier notifications=notifications}}`);
    expect(this.$('div').hasClass('u-tc-secondary')).to.be.true;
    expect(this.$('i').css('color')).to.eql('rgba(0, 0, 0, 0.541176)');
  });
});
