import Ember from 'ember';

export function assayColour(params/*, hash*/) {
  let assay = params[0];
  let model = params[1];
  let colours = ['purps', 'salmon', 'gold', 'limecordial', 'tealcumber'];
  let assays = model.getEach('properties.sampleTechnology');
  assays = assays.uniq();
  return new  Ember.Handlebars.SafeString('<span class="assay-small ' + colours[assays.indexOf(assay)] + '">')
}

export default Ember.HTMLBars.makeBoundHelper(assayColour);
