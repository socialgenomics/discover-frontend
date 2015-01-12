import Ember from 'ember';
import html from 'npm:json-to-html';

export function jsonHtml(input) {
  var text = html(JSON.parse(input));
  return new Ember.Handlebars.SafeString(text);
};

export default Ember.Handlebars.makeBoundHelper(jsonHtml);
