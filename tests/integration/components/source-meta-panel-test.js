/* jshint expr:true */
import { expect } from 'chai';
import {
  describeComponent,
  it
} from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describeComponent(
  'source-meta-panel',
  'Integration: SourceMetaPanelComponent',
  {
    integration: true
  },
  function() {
    it('renders back to datasource button if is not a personal repository', function() {
      const type = 'datasource';
      this.set('type', type);
      this.render(hbs`{{source-meta-panel type=type}}`);
      expect(this.$('a.left-align')).to.have.length(1);
    });

    it('does not render back to datasource button if it is a personal repository', function() {
      const type = 'personal_repository'
      this.set('type', type);
      this.render(hbs`{{source-meta-panel type=type}}`);
      expect(this.$('a.left-align')).to.have.length(0);
    });
  }
);
