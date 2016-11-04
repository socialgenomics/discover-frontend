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
    it('renders the collection owner dipsplayName', function() {
      const model = {
        userId: {
          id: 1,
          displayName: 'Nikola Tesla'
        },
        type: 'personal_repository'
      };
      this.set('model', model);
      this.render(hbs`{{source-meta-panel model=model}}`);
      expect(this.$('.collection-owner').text().trim()).to.eql(model.userId.displayName);
    });
  }
);
