import { expect } from 'chai';
import { describe, it, beforeEach } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';
import sinon from 'sinon';

describe('Integration | Component | RUI / r-tab-list-item', function() {
  setupComponentTest('rui/r-tab-list-item', {
    integration: true
  });

  describe('when tab data is given', function() {
    beforeEach(function() {
      const tab = {
        title: 'Searching for Data',
        target: 'help.searching-for-data',
        query: 'search-query'
      };
      this.set('tab', tab);
      this.render(hbs`{{rui/r-tab-list-item title=tab.title target=tab.target query=tab.query}}`);
    });

    it('renders correct tab title', function() {
      expect(this.$('span.px2').text().trim()).to.eql('Searching for Data');
    });
  });

  describe('action tab is active', function() {
    it('it should have an active class', function() {
      this.render(hbs`{{rui/r-tab-list-item
        activeTab='abc'
        tabName='abc'
        actionItem=true
      }}`);
      expect(this.$('li').hasClass('bc-white')).to.be.true;
    });
  });

  describe('action tab is inactive', function() {
    beforeEach(function() {
      this.set('setActiveTab', sinon.spy());
      this.render(hbs`{{rui/r-tab-list-item
        activeTab='abc'
        tabName='def'
        setActiveTab=setActiveTab
        actionItem=true
      }}`);
    });

    it('background should be off-white', function() {
      expect(this.$('li').hasClass('bc-very-light-grey')).to.be.true;
    });

    it('should have a hover effect', function() {
      expect(this.$('li').hasClass('u-hv-bc-very-light-grey')).to.be.true;
    });

    it('on click, the setActiveTab function is called with the tabName', function() {
      this.$('li').click();
      expect(this.get('setActiveTab').calledOnce).to.be.true;
      expect(this.get('setActiveTab').calledWith('def')).to.be.true;
    });
  });
});
