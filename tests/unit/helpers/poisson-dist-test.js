import {
  poissonDist
} from '../../../helpers/poisson-dist';
import { module, test } from 'qunit';

module('PoissonDistHelper');

// Replace this with your real tests.
test('it works', function(assert) {
  var result = poissonDist(42);
  assert.ok(result);
});
