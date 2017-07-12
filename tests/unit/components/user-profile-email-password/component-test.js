import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import Ember from 'ember';

const { setProperties, get } = Ember;

describe('Unit | Component | user profile email password', function() {
  setupComponentTest('user-profile-email-password', {
    needs: [
      'component:credential-list',
      'service:ajax'
    ],
    unit: true
  });

  describe('pendingCredential', function() {
    const method = this.title;
    const credentials = [
      { updatedAt: 1, verified: false },
      { updatedAt: 2, verified: true }
    ];

    it('returns false if there are no secondary credentials', function() {
      const component = this.subject();
      setProperties(component, {
        credentials: {
          secondary_credentials: []
        }
      });

      expect(get(component, method)).to.be.false;
    });

    it('returns a credential when there is at least one secondary cred', function() {
      const component = this.subject();
      setProperties(component, {
        credentials: {
          secondary_credentials: [credentials[0]]
        }
      });

      expect(get(component, method).updatedAt).to.eql(1);
    });

    it('returns false if the credential is verified', function() {
      const component = this.subject();
      setProperties(component, {
        credentials: {
          secondary_credentials: [credentials[1]]
        }
      });

      expect(get(component, method)).to.be.false;
    });
  });
});
