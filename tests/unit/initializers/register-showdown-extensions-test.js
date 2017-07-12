/* jshint expr:true */
/* eslint-disable */
import { expect } from 'chai';
import {
  describe,
  it,
  beforeEach
} from 'mocha';
import { initialize } from 'repositive/initializers/register-showdown-extensions';

describe('RegisterShowdownExtensionsInitializer', function() {
  beforeEach(function() {
    initialize();
  });

  it('it adds target="_blank" rel="noopener noreferrer" to each link in markdown', function() {
    const converter = new showdown.Converter({ extensions: ['targetBlankLinks'] });
    const dataProvider = [
      {
        markdown: '[google](google.com)',
        html: '<a target="_blank" rel="noopener noreferrer" href="google.com">google</a>'
      },
      {
        markdown: '[google](google.com)[google](google.com)[google](google.com)',
        html: '<a target="_blank" rel="noopener noreferrer" href="google.com">google</a>' +
        '<a target="_blank" rel="noopener noreferrer" href="google.com">google</a>' +
        '<a target="_blank" rel="noopener noreferrer" href="google.com">google</a>'
      }
    ];

    dataProvider.forEach(dataset => {
      expect(converter.makeHtml(dataset.markdown)).to.equal(`<p>${dataset.html}</p>`);
    });
  });

  describe('sanitizeSearchResults', function () {
    let converter;

    beforeEach(function () {
      converter = new showdown.Converter({ extensions: ['sanitizeSearchResults'] });
    });

    it('should allow em tags with class attr only', function () {
      const markup = '<em class="foo-bar" title="foo-bar">Foo</em>';
      const sanitizedMarkup = '<p><em class="foo-bar">Foo</em></p>';

      expect(converter.makeHtml(markup)).to.equal(sanitizedMarkup);
    });

    it('should correctly replace class for em highlight', function () {
      const markup = '<em class="highlight">Foo</em>';
      const sanitizedMarkup = '<p><em class="fw-bold">Foo</em></p>';

      expect(converter.makeHtml(markup)).to.equal(sanitizedMarkup);
    });

    it('should not replace class for em if it\'s different highlight', function () {
      const markup = '<em class="foo">Foo</em>';
      const sanitizedMarkup = '<p><em class="foo">Foo</em></p>';

      expect(converter.makeHtml(markup)).to.equal(sanitizedMarkup);
    });
  });
});
