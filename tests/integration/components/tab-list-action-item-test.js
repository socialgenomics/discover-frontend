import { expect } from 'chai';
import { beforeEach, describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';
import sinon from 'sinon';

describe('Integration | Component | tab list action item', function() {
  setupComponentTest('tab-list-action-item', {
    integration: true
  });

  describe('tab is active', function() {
    it('it should have an active class', function() {
      this.render(hbs`{{tab-list-action-item activeTab='abc' tabName='abc'}}`);
      expect(this.$('li').hasClass('u-bc-white')).to.be.true;
    });
  })

  describe('tab is inactive', function() {
    beforeEach(function() {
      this.set('setActiveTab', sinon.spy());
      this.render(hbs`{{tab-list-action-item
        activeTab='abc'
        tabName='def'
        setActiveTab=setActiveTab
      }}`);
    });

    it('background should be off-white', function() {
      expect(this.$('li').hasClass('u-bc-off-white')).to.be.true;
    });

    it('should have a hover effect', function() {
      expect(this.$('li').hasClass('u-hv-bc-off-white')).to.be.true;
    });

    it('on click, the setActiveTab function is called with the tabName', function() {
      this.$('li').click();
      expect(this.get('setActiveTab').calledOnce).to.be.true;
      expect(this.get('setActiveTab').calledWith('def')).to.be.true;
    });
  });
});
