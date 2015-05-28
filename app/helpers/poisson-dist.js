import Ember from 'ember';
import { poisson } from 'repositive.io/utils/distributions';

export function poissonDist(params/*, hash*/) {
  let fallback = 1;
  let lambda = params[0] || fallback;
  if (typeof lambda[0] !== 'number'){ lambda = fallback; }
  return poisson(lambda);
}

export default Ember.HTMLBars.makeBoundHelper(poissonDist);
