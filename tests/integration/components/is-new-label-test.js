import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';
import moment from 'moment';

describe('Integration | Component | is new label', function() {
  setupComponentTest('is-new-label', {
    integration: true
  });

  it('if there is no updatedAt, render new', function() {
    this.render(hbs`{{is-new-label}}`);
    expect(this.$().text().trim()).to.eql('NEW');
  });

  it('if updatedAt is older than two weeks, render nothing', function() {
    this.set('updatedAt', new Date('October 13, 2014'));
    this.render(hbs`{{is-new-label updatedAt=updatedAt}}`);
    expect(this.$().text().trim()).to.eql('');
  });

  it('if updatedAt is within two weeks, render new', function() {
    this.set('updatedAt', moment(new Date()).subtract(12, 'days'));
    this.render(hbs`{{is-new-label updatedAt=updatedAt}}`);
    expect(this.$().text().trim()).to.eql('NEW');

    this.set('updatedAt', moment(new Date()).subtract(14, 'days'));
    this.render(hbs`{{is-new-label updatedAt=updatedAt}}`);
    expect(this.$().text().trim()).to.eql('NEW');
  });
});
