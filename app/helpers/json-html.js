import Ember from 'ember';
import html from 'npm:json-to-html';

export function jsonHtml(input) {
  return html(input);
};

export default Ember.Handlebars.makeBoundHelper(jsonHtml);
