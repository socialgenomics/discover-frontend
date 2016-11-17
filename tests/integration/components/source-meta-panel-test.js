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
      this.set('type', 'datasource');
      this.render(hbs`{{source-meta-panel type=type}}`);
      expect(this.render(hbs`{{panel-back-button type='datasources'}}`));
    });
  }
);
