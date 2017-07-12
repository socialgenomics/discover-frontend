import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describe('Integration | Component | text with icon', function() {
  setupComponentTest('text-with-icon', {
    integration: true
  });

  describe('block usage', function() {
    it('renders the icon with the text', function() {
      this.render(hbs`
        {{#text-with-icon icon="thumbs-o-up"}}
          some text
        {{/text-with-icon}}
      `);
      expect(this.$().text().trim()).to.eql('some text');
      expect(this.$('i').hasClass('fa-thumbs-o-up')).to.be.true;
    });
  });

  describe('regular usage', function() {
    it('renders the icon with the text', function() {
      this.render(hbs`{{text-with-icon text="some text" icon="thumbs-o-up"}}`);
      expect(this.$().text().trim()).to.eql('some text');
      expect(this.$('i').hasClass('fa-thumbs-o-up')).to.be.true;
    });
  });
});
