import Ember from 'ember';
import { expect } from 'chai';
import { it, describe } from 'mocha';
import { setupTest } from 'ember-mocha';
import sinon from 'sinon';

const { set, setProperties, get } = Ember;

describe('UsersSignupController', function() {
  setupTest('controller:users/signup', {
    needs: [
      'service:ajax',
      'service:session',
      'service:metrics',
      'validator:presence',
      'validator:length',
      'validator:format'
    ]
  });

  it('_displayMessage always shows a flash message error', function() {
    const controller = this.subject();
    const resp = { message: 'Example error message.' };
    set(controller, '_addFlashMessage', sinon.spy());
    controller._displayMessage(resp);
    expect(get(controller, '_addFlashMessage').calledWith('Example error message.', 'warning')).to.eql(true);
  });

  it('isDisabled is true when the form is invalid', function() {
    const controller = this.subject();
    expect(get(controller, 'isDisabled')).to.be.equal(true);
  });

  it('isDisabled is true when in loading state', function() {
    const controller = this.subject();
    setProperties(controller, {
      fullname: 'aaaaaa',
      email: 'aaa@aa.aa',
      password: 'aaaaaaa1',
      loading: true
    });
    expect(get(controller, 'isDisabled')).to.be.equal(true);
  });

  it('isDisabled is false when form is valid', function() {
    const controller = this.subject();
    setProperties(controller, {
      fullname: 'aaaaaa',
      email: 'aaa@aa.aa',
      password: 'a@34567A',
      loading: false
    });
    expect(get(controller, 'isDisabled')).to.be.equal(false);
  });

  it('_buildCredentials returns object with email, pw, first and lastname', function() {
    const controller = this.subject();
    setProperties(controller, {
      'fullname': 'Test Name',
      'email': 'testemail@example.com',
      'password': 'Abcdefghi'
    });

    const credentials = controller._buildCredentials();

    expect(credentials.firstname).to.be.equal('Test');
    expect(credentials.lastname).to.be.equal('Name');
    expect(credentials.email).to.be.equal('testemail@example.com');
    expect(credentials.password).to.be.equal('Abcdefghi');
  });

  describe('_getPasswordStrength', function() {
    it('should return number equal to positive pattern matches', function () {
      const controller = this.subject();
      const patterns = [/\d/, /[A-Z]/];
      const dataProvider = [
        { password: '', strength: 0 },
        { password: 'aaaa', strength: 0 },
        { password: 'Aaaa', strength: 1 },
        { password: 'AAaa', strength: 1 },
        { password: '1aaa', strength: 1 },
        { password: '11aa', strength: 1 },
        { password: '11AA', strength: 2 }
      ];

      dataProvider.forEach(dataset => {
        expect(controller._getPasswordStrength(dataset.password, patterns)).to.be.equal(dataset.strength);
      });
    });
  });

  describe('strength computed property', function() {
    it('should be equal "weak"', function () {
      const controller = this.subject();
      set(controller, 'password', '');

      expect(get(controller, 'passwordStrength')).to.be.equal('weak');
    });

    it('should be equal "medium"', function () {
      const controller = this.subject();
      const passwords = ['aaaaaaa1', 'aaaaaaaA', 'aaaaaaa@'];

      passwords.forEach(password => {
        set(controller, 'password', password);
        expect(get(controller, 'passwordStrength')).to.be.equal('medium');
      });
    });

    it('should be equal "strong"', function () {
      const controller = this.subject();
      const passwords = ['Aaaaaa1A', 'aaaaaA1@', 'aaaaaaA@1'];

      passwords.forEach(password => {
        set(controller, 'password', password);
        expect(get(controller, 'passwordStrength')).to.be.equal('strong');
      });
    });
  });
});
