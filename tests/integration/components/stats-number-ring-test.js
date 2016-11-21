/* jshint expr:true */
import { expect } from 'chai';
import {
  describeComponent,
  it
} from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describeComponent(
  'stats-number-ring',
  'Integration: StatsNumberRingComponent',
  {
    integration: true
  },
  function() {
    it('Renders open text when the stat is open', function() {
      this.render(hbs`{{stats-number-ring stat="open"}}`);
      expect(this.$('p').text().trim()).to.eql('Open');
    });

    it('Renders restricted text when the stat is restricted', function() {
      this.render(hbs`{{stats-number-ring stat="restricted"}}`);
      expect(this.$('p').text().trim()).to.eql('Restricted');
    });
  }
);
