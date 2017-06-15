import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import sinon from 'sinon';
import Ember from 'ember';

const { setProperties } = Ember;

describe('Unit | Component | email verification', function() {
  setupComponentTest('email-verification', {
    needs: [
      'validator:presence',
      'validator:format',
      'service:ajax',
      'service:session'
    ],
    unit: true
  });

  describe('_getExistingCredential', function() {
    const method = this.title;
    const credentials =  [
      { email: 'abc@example.com'}, { email: 'xyz@example.com' }
    ];
    const store = {
      peekAll: sinon.stub().returns(credentials)
    }

    it('returns false when there is no existingCredential', function() {
      const component = this.subject();
      const email = '123@example.com';

      setProperties(component, { store })
      expect(component[method](email)).to.be.false;
    });

    it('returns a credential if email matches an email in list', function() {
      const component = this.subject();
      const email = 'abc@example.com';

      setProperties(component, { store })
      expect(component[method](email).email).to.eql(email);
    });
  });
});
