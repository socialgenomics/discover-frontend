/* jshint expr:true */
import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describe('Integration | Component | collapsible description', function() {
  setupComponentTest('collapsible-description', {
    integration: true
  });

  it('displays show less button when description is fully displayed', function() {
    this.render(hbs`{{collapsible-description description=model.description}}`);
    this.$('p.read-more-btn').click();
    expect(this.$('p.read-more-btn').text().trim()).to.eql('Show Less');
  });

  it('displays read more button when description is truncated by default', function() {
    this.render(hbs`{{collapsible-description description=model.description}}`);
    expect(this.$('p.read-more-btn').text().trim()).to.eql('Read More');
  });

  it('does not display read more button if description is less than 500 characters', function() {
    const text = 'short description.';
    this.set('description', text)
    this.render(hbs`{{collapsible-description description=description}}`);
    expect(this.$('p.read-more-btn')).to.have.length(0);
  });
});
