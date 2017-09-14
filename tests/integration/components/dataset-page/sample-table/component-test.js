import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describe('Integration | Component | dataset page/sample table', function() {
  setupComponentTest('dataset-page/sample-table', {
    integration: true
  });

  it('renders a table without any text before it', function() {
    const table = '<p>hello</p> <table><tr><td>hi</td></tr></table>';
    this.set('table', table);
    this.render(hbs`{{dataset-page/sample-table table=table}}`);
    expect(this.$('.c-sample-table').text().trim()).to.eql('hi');
  });
});
