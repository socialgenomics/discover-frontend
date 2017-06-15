import { expect } from 'chai';
import { beforeEach, describe } from 'mocha';
import { setupModelTest, it } from 'ember-mocha';

setupModelTest(
  'user',
  'Unit | Model | user',
  { needs: ['model:credential', 'model:user-setting'] },
  function() {
    describe('reputationTotal', function() {
      beforeEach(function() {
        const rep = {
          quality: 0,
          verification: 0,
          ownership: 0,
          contribution: 0
        };
        this.subject().set('reputation', rep);
      });

      it('calculate correct total for all zeroes', function() {
        expect(this.subject().get('reputationTotal')).to.eql(0);
      });

      it('calculate correct total for regular numbers', function() {
        this.subject().setProperties({
          'reputation.quality': 10,
          'reputation.verification': 9,
          'reputation.ownership': 60,
          'reputation.contribution': 1000
        });
        expect(this.subject().get('reputationTotal')).to.eql(1079);
      });
    })
  }
);
