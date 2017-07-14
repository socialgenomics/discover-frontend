import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupTest } from 'ember-mocha';

function buildModel(props) {
  return {
    stats: { datasets: props.datasetsNumber}
  }
}
describe('Unit | Controller | datasets/detail !T', function() {
  setupTest('controller:datasets/detail', {
    needs: [
      'service:metrics',
      'service:session'
    ]
  });

  describe('computed proprties', function() {
    describe('datasetsNumber', function() {
      const method = this.title;

      it('returns a number as a string', function() {
        let controller = this.subject();
        controller.set('model', buildModel({ datasetsNumber: 10 }));
        expect(controller.get(method)).to.eql('10');
      });

      it('comma-izes large numbers', function() {
        let controller = this.subject();
        controller.set('model', buildModel({ datasetsNumber: 10000 }));
        expect(controller.get(method)).to.eql('10,000');
        controller.set('model.stats.datasets', 1000000);
        expect(controller.get(method)).to.eql('1,000,000');
      });
    });
  });
});
