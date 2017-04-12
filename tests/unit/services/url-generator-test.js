import { expect } from 'chai';
import { it, describe } from 'mocha';
import { setupTest } from 'ember-mocha';

describe('UrlGeneratorService', function() {
  setupTest('service:url-generator');
  it('throws error when called generateUrl and service is not initialized', function() {
    const service = this.subject();
    const errorFn = () => {
      service.generateUrl('test', 1);
    };

    expect(errorFn).to.throw(Error, 'GenerateUrl service was not initialized');
  });

  it('returns Url when called generateUrl after service initialisation', function() {
    const service = this.subject();
    const routerMock = {
      generate() { return '/test'; }
    };

    service.initialize(routerMock);
    expect(service.generateUrl('test', 1)).to.eql('http://localhost:7357/test');
  });
});
