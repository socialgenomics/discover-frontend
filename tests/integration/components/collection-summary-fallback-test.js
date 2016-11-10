/* jshint expr:true */
import { expect } from 'chai';
import {
  describeComponent,
  it
} from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describeComponent(
  'collection-summary-fallback',
  'Integration: CollectionSummaryFallbackComponent',
  {
    integration: true
  },
  function() {
    it('renders the summary when present', function() {
      const summary = 'The quick brown fox.';
      this.set('summary', summary);
      this.render(hbs`{{collection-summary-fallback summary=summary}}`);
      expect(this.$('.markdown-text').text().trim()).to.eql(summary);
    });

    it('renders the description when there is no summary', function() {
      const description = 'Jumps over the lazy dog.';
      this.set('description', description);
      this.render(hbs`{{collection-summary-fallback description=description}}`);
      expect(this.$('.markdown-text').text().trim()).to.eql(description);
    });

    it('renders the summary when summary and description are present', function() {
      const description = 'Jumps over the lazy dog.';
      const summary = 'The quick brown fox.';
      this.setProperties({ description, summary });
      this.render(hbs`{{collection-summary-fallback summary=summary description=description}}`);
      expect(this.$('.markdown-text').text().trim()).to.eql(summary);
    });

    it('renders the description when summary is empty', function() {
      const description = 'Jumps over the lazy dog.';
      const summary = '';
      this.setProperties({ description, summary });
      this.render(hbs`{{collection-summary-fallback summary=summary description=description}}`);
      expect(this.$('.markdown-text').text().trim()).to.eql(description);
    });
  }
);
