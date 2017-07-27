import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupTest } from 'ember-mocha';

describe('Unit | Service | error messages', function() {
  setupTest('service:error-messages', {
    // Specify the other units that are required for this test.
    needs: ['service:i18n']
  });
  describe('getErrorPath', function() {
    const context = 'dataset';
    const fakeErrorResp = {
      category: 'invalid-syntax',
      props: {
        tag: { 'min-length': '5' }
      }
    };

    it('returns path to default error message when no props provided', function() {
      const service = this.subject();

      const result = service._getErrorPath(context, { category: 'invalid-syntax' });
      expect(result).to.eql('dataset.invalid-syntax.default');
    });

    it('returns path to most detail interpolated message', function() {
      const service = this.subject();

      const result = service._getErrorPath(context, fakeErrorResp)
      expect(result).to.eql('dataset.invalid-syntax.tag.min-length');
    });
  })
});
