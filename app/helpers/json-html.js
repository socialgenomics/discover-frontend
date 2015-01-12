import Ember from 'ember';
import html from 'npm:json-to-html';

export function jsonHtml(input) {
  //TODO: this only  accepts a sting at the minute, eve if I pass it json object from the template
  if (typeof(input) == "string"){
      input = JSON.parse(input);
  }
  var htmlString = html(input);
  return new Ember.Handlebars.SafeString(htmlString);
};

export default Ember.Handlebars.makeBoundHelper(jsonHtml);
