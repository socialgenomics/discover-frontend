import { expect } from 'chai';
import { describe, it, beforeEach } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

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
});
