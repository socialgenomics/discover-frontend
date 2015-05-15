import Ember from 'ember';
import { getColours } from 'repositive.io/utils/colours';

export function assayColour(params/*, hash*/) {
  let assay = params[0];
  let model = params[1];
  let assays = model.getEach('properties.assayType');
  assays = assays.uniq();
  let colours = getColours(assays.length);
  return new  Ember.Handlebars.SafeString('<span class="assay-small ' + colours[assays.indexOf(assay)] + '">')
}

export default Ember.HTMLBars.makeBoundHelper(assayColour);
