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
});
