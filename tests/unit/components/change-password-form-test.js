import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import Ember from 'ember';

const { setProperties, get } = Ember;

describe('Unit | Component | change password form', function() {
  setupComponentTest('change-password-form', {
    needs: [
      'validator:presence',
      'validator:format',
      'validator:confirmation',
      'validator:length',
      'service:ajax',
      'service:session'
    ],
    unit: true
  });
  describe('isDisabled', function() {
    it('is disabled when loading', function() {
      const component = this.subject();
      setProperties(component, {
        loading: true,
        oldPassword: '12345678',
        password1: 'Abcdefghi1',
        password2: 'abc'
      });

      expect(get(component, 'isDisabled')).to.be.true;
    });

    it('is true when pws dont match', function() {
      const component = this.subject();
      setProperties(component, {
        loading: false,
        oldPassword: '12345678',
        password1: 'Abcdefghi1',
        password2: 'Abcdefghi2'
      });

      expect(get(component, 'isDisabled')).to.be.true;
    });

    it('is false when pws match', function() {
      const component = this.subject();
      setProperties(component, {
        loading: false,
        oldPassword: '12345678',
        password1: 'Abcdefghi1',
        password2: 'Abcdefghi1'
      });

      expect(get(component, 'isDisabled')).to.be.false;
    });
  });
});
