import Ember from 'ember';
import { getColours } from 'repositive.io/utils/colours';
import _ from 'npm:underscore';

export function assayKey(params/*, hash*/) {
  let model = params[0];
  let assays = model.getEach('properties.assayType');
  console.log(assays)
  assays = assays.uniq();
  let colours = getColours(assays.length);
  return new Ember.Handlebars.SafeString(
    '<div class="assay-key right">' +
    '<span>Assay Key:</span>' +  
      _.map(assays, function(assay){
      return '<span class="assay {colour}">{assay}</span>'
        .replace('{colour}', colours[assays.indexOf(assay)])
        .replace('{assay}', assay)
      }).join('') +
    '</div>'
  )
}

export default Ember.HTMLBars.makeBoundHelper(assayKey);
