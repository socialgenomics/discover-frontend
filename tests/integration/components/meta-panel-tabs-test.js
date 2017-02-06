import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describe('Integration | Component | meta panel tabs', function() {
  setupComponentTest('meta-panel-tabs', {
    integration: true
  });

  it('When displayInfo is true, info tab is active', function() {
    this.set('displayInfo', true);
    this.render(hbs`{{meta-panel-tabs displayInfo=displayInfo}}`);
    expect(this.$('.u-border-bottom').text().trim()).to.eql('More Information');
  });

  it('When displayInfo is false, filters tab is active', function() {
    this.set('displayInfo', false);
    this.render(hbs`{{meta-panel-tabs displayInfo=displayInfo}}`);
    expect(this.$('.u-border-bottom').text().trim()).to.eql('Filters');
  });
});
