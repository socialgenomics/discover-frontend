/* jshint expr:true */
import { expect } from 'chai';
import { it, describe } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describe('Integration: StatsNumberRingComponent', function() {
  setupComponentTest('stats-number-ring', {
    integration: true
  });

  it('Renders open text when the stat is open', function() {
    this.render(hbs`{{stats-number-ring stat="open"}}`);
    expect(this.$('p').text().trim()).to.eql('Open');
  });

  it('Renders restricted text when the stat is restricted', function() {
    this.render(hbs`{{stats-number-ring stat="restricted"}}`);
    expect(this.$('p').text().trim()).to.eql('Restricted');
  });

  it('Renders a stat number and its label', function() {
    this.render(hbs`{{stats-number-ring stat=6 label="abc"}}`);
    expect(this.$('span').text().trim()).to.eql('6');
    expect(this.$('p').text().trim()).to.eql('abc');
  });
});
