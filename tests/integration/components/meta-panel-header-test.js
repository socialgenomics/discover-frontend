import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describe('Integration | Component | meta panel header', function() {
  setupComponentTest('meta-panel-header', {
    integration: true
  });

  it('renders back to datasource button if is not a personal repository', function() {
    this.set('model', { type: 'datasource' });
    this.render(hbs`{{meta-panel-header type=model.type}}`);
    expect(this.$('div.fc-secondary.absolute')).to.have.length(1);
  });

  it('does not render back to datasource button if it is a personal repository', function() {
    this.set('model', { type: 'personal_repository' });
    this.render(hbs`{{meta-panel-header type=model.type}}`);
    expect(this.$('div.fc-secondary.absolute')).to.have.length(0);
  });

  it('renders collection header if it is a collection', function() {
    this.set('model', { type: 'repositive_collection' });
    this.render(hbs`{{meta-panel-header type=model.type}}`);
    expect(this.$('i').hasClass('fa-book')).to.be.true;
    expect(this.$('h5').text().trim()).to.eql('Collection');
  });
});
